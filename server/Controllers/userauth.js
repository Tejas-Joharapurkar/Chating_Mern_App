import User from "../Models/User.js";

//* function to create a user
export const signup = async (req, res) => {
    console.log(req.body);
    try {
        const NewUser = await User.create({ ...req.body })
        // const token = NewUser.CreateJWT()
        // res.cookie('JWT', token, {
        //     expires: new Date(Date.now() + 2589200000),
        //     httpOnly: true
        // }).json({ token, message: "login Successful" })
        res.status(201).json({ userId: NewUser._id, username: NewUser.username })
    } catch (error) {
        res.status(401).json({ message: `${error.message}` })
    }
}

export const login = async (req, res) => {
    console.log("hited");
    console.log(req.body);
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(401).send("please provide email and password")
            console.log("please provide email and password");
        } else {
            const user = await User.findOne({ username })
            if (!user) {
                res.status(401).send("inalid email User not Found")
                console.log("inalid email User not Found");
            } else {
                const isPasswordCorrect = await user.ComparePassword(password)
                if (isPasswordCorrect) {
                    const { _id, username } = user
                    res.status(201).json({ userId: _id, username })
                } else {
                    res.status(401).send("password Incorrect")
                }
            }
        }
    } catch (error) {
        res.status(401).send(error.message)

        // next(error)
    }
}

export default { signup, login }