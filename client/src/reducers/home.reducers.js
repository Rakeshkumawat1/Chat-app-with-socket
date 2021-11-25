import { chatConstants } from "../actions/constants";

const initState = {
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    console.log(action)
    switch(action.type){
        case chatConstants.CHAT_DATA_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case chatConstants.CHAT_DATA_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case chatConstants.CHAT_DATA_FAILURE:
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