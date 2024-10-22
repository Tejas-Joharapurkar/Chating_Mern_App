import express from "express"
const router = express.Router()
import { signup, login } from '../Controllers/userauth.js'
router.route('/login').post(login)
router.route('/signup').post(signup)

export default router