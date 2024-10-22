import React, { useContext, createContext, useState, useEffect } from 'react'
import { useGlobalUserContext } from './UserContext'
import { useGlobalDataContext } from './DataContext'
import messagesound from '../Components/Whatsapp Message - QuickSounds.com.mp3'
const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null)
    const [roomId, setRoomId] = useState('')
    const { state } = useGlobalUserContext()
    const { dispatch: dataDispatch } = useGlobalDataContext()
    useEffect(() => {
        if (state.user) {
            const socket = new WebSocket(`ws://localhost:8000?username=${state.user.username}&id=${state.user.userId}`);
            setWs(socket);
            socket.onmessage = ((event) => {
                const message = JSON.parse(event.data)
                dataDispatch({ type: 'ONMESSAGE', payload: message })
                const audio = new Audio(messagesound).play();
            })
            return () => {
                ws.close()
                setWs(null)
            }
        }
    }, [state.user])
    return <SocketContext.Provider value={
        {
            ws,
            setWs,
            roomId,
            setRoomId
        }
    }>
        {children}
    </SocketContext.Provider>
}

export const useGlobalSocketContext = () => {
    return useContext(SocketContext)
}

export { SocketContext, SocketProvider }