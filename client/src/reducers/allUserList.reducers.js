import { allUserListConstants } from "../actions/constants";

const initState = {
    error: null,
    loading: false,
    allUserList: []
}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case allUserListConstants.ALL_USER_LIST_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case allUserListConstants.ALL_USER_LIST_SUCCESS:
            state = {
                ...state,
                loading: false,
                allUserList: action.payload.message
            }
            break;
        case allUserListConstants.ALL_USER_LIST_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}