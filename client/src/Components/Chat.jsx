import React, { useState, useEffect } from 'react'
import { useGlobalSocketContext } from '../Context/ScoketContext'
import { useNavigate } from 'react-router-dom'
const Chat = () => {
    const [chat, setChat] = useState([])
    const { ws, setRoomId } = useGlobalSocketContext()
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const handleClick = () => {
        console.log(message);
        ws.send(message)
        setMessage('')
    }
    useEffect(() => {
        if (ws) {
            ws.addEventListener('message', ({ data }) => {
                console.log(data);
                setChat((prevChat) => [...prevChat, data]);
            });
        }
    }, [ws]);
    const leaveroom = () => {
        if (ws) {
            ws.close()
            setRoomId('')
        }
        navigate('/')
    }
    return (
        <div>
            <button onClick={() => leaveroom()}>Leave Room</button>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />

            <button onClick={() => handleClick()}>send</button>

            <div>
                {
                    chat?.map((item, index) => {
                        // console.log(Buffer.from(item));
                        return (
                            <p key={index}>{item}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Chat