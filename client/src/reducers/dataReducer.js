const dataReducer = (state, action) => {

    if (action.type === 'SETACTIVEFRIEND') {
        return {
            ...state, activeFriend: action.payload, friends: state.friends.map((friend) => {
                if (friend.name === action.payload) {
                    return { ...friend, count: 0 };
                } else {
                    return friend;
                }
            })
        }
    }

    if (action.type === 'ONMESSAGE') {
        const { reciver, sender } = action.payload
        console.log(`${state.activeFriend} ${sender} ${reciver}`);
        if (state.activeFriend === reciver || state.activeFriend === sender) {
            return { ...state, messages: [...state.messages, action.payload] }
        }
        else {
            let topFriend;
            state.friends = state.friends.filter((friend) => {
                if (friend.name === sender) {
                    topFriend = { ...friend, count: friend.count + 1 }
                    return false;
                } else {
                    return true;
                }
            })
            console.log(state.friends);
            return { ...state, friends: [topFriend, ...state.friends] }
        }
    }
    if (action.type === 'SETMESSAGE') {
        return { ...state, messages: action.payload }
    }
    if (action.type === 'SETFRIEND') {
        console.log("SETFRIEND recived");
        console.log(action.payload);
        const friendList = action.payload.map((friend) => {
            return { name: friend, count: 0 }
        })
        return { ...state, friends: friendList }
    }
    else {
        return { ...state }
    }
}
export default dataReducer
