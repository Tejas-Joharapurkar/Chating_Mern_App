const userReducer = (state, action) => {
    if (action.type === 'LOGIN') {
        return { ...state, user: action.payload, url: `ws://localhost:8000?username=${action.payload.username}&id=${action.payload.userId}` }
    }
}
export default userReducer