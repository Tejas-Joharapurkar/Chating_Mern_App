import React, { useEffect, useState, useRef, memo } from 'react'
import { useGlobalUserContext } from '../Context/UserContext'
import { useGlobalSocketContext } from '../Context/ScoketContext'
import { useGlobalDataContext } from '../Context/DataContext'
import axios from 'axios'
import clicksound from './mixkit-mouse-click-close-1113.wav'
const Messages = memo(() => {
    console.log('message component');
    const { state: userState } = useGlobalUserContext()
    const { ws } = useGlobalSocketContext()
    const { dispatch: dataDispatch, activeFriend, messages } = useGlobalDataContext()
    const { username } = userState.user
    const msgref = useRef(null)
    useEffect(() => {
        const fetchmessage = async () => {
            if (activeFriend !== '') {
                try {
                    const response = await axios.get(`http://localhost:8000/api/v1/user/getusermessage/${username}/${activeFriend}`)
                    dataDispatch({ type: 'SETMESSAGE', payload: response.data })
                } catch (error) {
                    alert(`alert from Message ${activeFriend}`)
                    dataDispatch({ type: 'SETMESSAGE', payload: [] })
                }
            }
        }
        fetchmessage()
    }, [activeFriend])
    const sendMessage = () => {
        const message = { sender: username, reciver: activeFriend, content: msgref.current.value }
        ws.send(JSON.stringify(message))
        msgref.current.value = ''
        const audio = new Audio(clicksound)
        audio.play()
        dataDispatch({ type: 'ONMESSAGE', payload: message })
    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {messages.map((msg, index) => {
                    return (
                        <h3 style={{ alignSelf: msg.sender === username ? 'flex-end' : 'flex-start', padding: '10px', background: msg.sender === username ? 'green' : 'grey', color: 'black', minWidth: '4rem', borderRadius: '0.5rem', margin: '0.5rem', textAlign: 'center' }} key={index}>{msg.content}</h3>
                    )
                })
                }
            </div>
            <input type="text" ref={msgref} />
            <button onClick={sendMessage}>send</button>
        </>
    )
})

export default Messages