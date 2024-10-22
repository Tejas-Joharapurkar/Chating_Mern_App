import User from "../Models/User.js";
import Conversation from "../Models/Conversation.js";
// import { onlinr_user } from "../server";


export const getalluser = async (req, res) => {
    const users = await User.find()
    const usernames = users.map((user) => {
        return user.username
    })
    res.status(201).json(usernames)
}

export const getFriends = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(201).json(user.friends)
    } catch (error) {
        res.status(401).json({ "error": `${error.message}` })
    }
}
export const addFriend = async (req, res) => {
    const { id, name } = req.params
    try {
        const user = await User.findById({ _id: id })
        // console.log(user);
        if (user.friends.length > 0) {
            const user = await User.findByIdAndUpdate(id, { $push: { frineds: name } }, { new: true })
            res.status(201).json(user.friends)
        } else {
            const user = await User.findByIdAndUpdate(id, { frineds: [name] }, { new: true })
            res.status(201).json(user.friends)
        }
    } catch (error) {
        res.status(401).json({ "error": `${error.message}` })
    }
}
export const addOfflineMessage = async (req, res) => {
    // sender,reciver,message 
    const { id, reciver, message } = req.params
    try {
        const user = await User.findOne({ username: reciver })
        const check = user.offline.map((sender) => {
            if (sender.senderId === id) {
                return true;
            }
        })

        if (check) {
            console.log(user);
            const nu = await User.findOneAndUpdate({ username: reciver, 'offline.senderId': id }, { $push: { 'offline.$.messages': message } }, { new: true })
            res.status(201).json(nu)
        } else {
            const nu = await User.updateOne({ username: reciver }, { $push: { offline: { senderId: id, messages: [message] } } });
            res.status(201).json(nu)
        }
    } catch (error) {
        res.status(401).json({ "error": `${error.message}` })
    }
}
export const getusermessage = async (req, res) => {
    const { username1, username2 } = req.params
    console.log(req.params);
    let participants = [username1, username2].sort().join('')
    try {
        // const reciver_id = onlinr_user.get(reciver).userId
        const messages = await Conversation.findOne({ participants })
        res.status(201).json(messages.messages)
    } catch (error) {
        res.status(401).json({ "error": `${error.message}` })
    }
}
export const savemessage = async (req, res) => {
    const { username1, username2 } = req.params
    let participants = [username1, username2].sort().join('')
    console.log(participants);
    const { sender, content } = req.body
    try {
        const message = await Conversation.findOne({ participants })
        const m = { sender, content }
        if (message) {
            const um = await Conversation.findOneAndUpdate({ participants }, { $push: { messages: [m] } }, { new: true })
            res.status(201).json(um)
        } else {
            const nm = await Conversation.create({ participants, messages: [m] })
            res.status(201).json(nm)
        }
    } catch (error) {
        res.status(401).json({ "error": `${error.message}` })
    }
}
export default { addFriend, addOfflineMessage, getFriends, getusermessage, savemessage }