import axios from "../helpers/axios"
import { chatConstants } from "./constants"

export const homeData = (form, user) => {
    return async (dispatch) => {

        try {
            let uid = user.uid;
            dispatch({ type: chatConstants.CHAT_DATA_REQUEST });
            const res = await axios.post(`/addnewuser`, {
                ...form,
                uid
            });
            if (res.status === 200) {
                const { message } = res.data;
                dispatch({
                    type: chatConstants.CHAT_DATA_SUCCESS,
                    payload: {
                        message
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: chatConstants.CHAT_DATA_FAILURE,
                payload: { error: error.response }
            });
        }
    }
}