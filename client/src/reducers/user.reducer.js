import { userConstants } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false,
    verified: false
}

export default (state = initState, action) => {
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                verified: true,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                verified: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}