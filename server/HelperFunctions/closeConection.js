import { onlinr_user } from "../server.js"
const closeConection = (req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const username = url.searchParams.get('username');
    console.log(`closeconnection ${username}`);
    onlinr_user.delete(username)
    onlinr_user.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
    });
}

export default closeConection