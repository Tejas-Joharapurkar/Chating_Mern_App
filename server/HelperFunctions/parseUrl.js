import { onlinr_user } from "../server.js";
import url from 'url'
//! function/logic to parse URL and get roomId and create or join the room
const parseUrl = (req, socket) => {
    console.log("parseUrl called");
    // console.log(req);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const username = url.searchParams.get('username');
    const id = url.searchParams.get('id');
    // console.log(req);
    onlinr_user.set(username, { id, socket })
    onlinr_user.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value.id}`);
    });
}
export default parseUrl 