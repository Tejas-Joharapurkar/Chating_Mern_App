import express from "express"
import { addFriend, addOfflineMessage, getFriends, getusermessage, savemessage } from "../Controllers/usercontroller.js"
const router = express.Router()

router.route('/addfriend/:id/:name').patch(addFriend)//*done
router.route('/addofflinemessage/:id/:reciver/:message').patch(addOfflineMessage)//* done
router.route('/getfriend/:id').get(getFriends)//* done
router.route('/getusermessage/:username1/:username2').get(getusermessage)
router.route('/savemessage/:username1/:username2').post(savemessage)
export default router