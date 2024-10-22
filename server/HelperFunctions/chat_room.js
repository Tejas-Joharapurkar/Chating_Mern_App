import { onlinr_user } from "../server.js";
import Conversation from "../Models/Conversation.js";
//!function to caht in room
const chat_room = async (socket, message, req) => {
    const { sender, reciver, content } = JSON.parse(message)
    if (onlinr_user.has(reciver)) {
        const reciver_scoket = onlinr_user.get(reciver).socket
        // console.log(reciver_scoket);
        reciver_scoket.send(`${message}`)
        let participants = [sender, reciver].sort().join('')
        try {
            const message = await Conversation.findOne({ participants })
            const m = { sender, content }
            if (message) {
                const um = await Conversation.findOneAndUpdate({ participants }, { $push: { messages: [m] } }, { new: true })
                // res.status(201).json(um)
            } else {
                const nm = await Conversation.create({ participants, messages: [m] })
                // res.status(201).json(nm)
            }
        } catch (error) {
            // res.status(401).json({ "error": `${error.message}` })
            console.log(`error in chat_room: ${error.message}`);
        }
    } else {
        //! handle offline user
    }
}

export default chat_room