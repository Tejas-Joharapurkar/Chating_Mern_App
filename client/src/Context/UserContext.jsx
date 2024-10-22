import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import userReducer from '../reducers/userReducer'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null
}
const UserContext = createContext()
const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    }, [state.user])
    return (
        <UserContext.Provider value={{ dispatch, state }}>{children}</UserContext.Provider>
    )
}
export const useGlobalUserContext = () => {
    return useContext(UserContext)
}
export { UserProvider, UserContext }