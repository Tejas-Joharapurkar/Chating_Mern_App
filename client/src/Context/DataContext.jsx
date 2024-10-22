import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import dataReducer from '../reducers/dataReducer'

const INITIAL_STATE = {
    messages: [],
    friends: [],
    activeFriend: '',
}

const DataContext = createContext()
const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)
    // useEffect(() => {
    //     localStorage.setItem('friends', JSON.stringify(state.friends))
    // }, [state.friends])
    return (
        <DataContext.Provider value={{ dispatch, ...state }}>{children}</DataContext.Provider>
    )
}
export const useGlobalDataContext = () => {
    return useContext(DataContext)
}
export { DataProvider, DataContext }