import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios';
import { useGlobalSocketContext } from '../Context/ScoketContext'
import { useGlobalUserContext } from '../Context/UserContext'
import { useGlobalDataContext } from '../Context/DataContext'
import { useNavigate } from 'react-router-dom'
import './roomcred.css'
import Messages from './Messages';
const RoomCred = () => {
    const navigate = useNavigate()
    const { state } = useGlobalUserContext()
    useLayoutEffect(() => {
        if (!state.user) {
            navigate('/login')
        }
    }, [])
    const { friends, activeFriend, dispatch: dataDispatch } = useGlobalDataContext()
    const handleClick = (name) => {
        dataDispatch({ type: 'SETACTIVEFRIEND', payload: name })
    }
    useEffect(() => {
        // console.log(activeFriend)
        const fetchData = async () => {
            let response
            try {
                response = await axios.get(`http://localhost:8000/api/v1/user/getfriend/${state.user.userId}`)
                // console.log("SETACTIVEFRIEND called");
                dataDispatch({ type: 'SETFRIEND', payload: response.data })
            } catch (error) {
                alert(error.messages)
            }
        }
        fetchData()
    }, [])
    console.log("room component");
    return (
        <>
            <div className="main-home-container">
                <div className="side-bar">
                    <div className="serach-bar">
                        user: {state.user?.username}
                    </div>
                    <div className="friends-section">
                        {friends?.map((friend, index) => {
                            return (
                                <h3 key={friend.name} onClick={() => { handleClick(friend.name) }} style={{ border: '1px solid white', padding: '2px', marginBottom: '1px', transition: '2s all ease-out' }}>{friend.name} {friend.count}</h3>
                            )
                        })}
                    </div>
                </div>
                {activeFriend.length > 0 ? <div className="chat-section">
                    <div className="navbar">
                        {activeFriend}
                    </div>
                    <div className="message-section" style={{ overflow: 'auto' }}>
                        <Messages />
                    </div>
                    <div className="type-section">
                        {/* <input type="text" ref={msgref} />
                        <button onClick={sendMessage}>send</button> */}
                    </div>
                </div> : <h1>Chat section</h1>}
            </div>
        </>
    )
}

export default RoomCred