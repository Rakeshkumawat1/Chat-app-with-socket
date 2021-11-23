import axios from "../helpers/axios"
import { userConstants } from "./constants"

export const signup = (user) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: userConstants.USER_REGISTER_REQUEST });

            const res = await axios.post(`/admin/auth/signup`, {
                ...user
    
            });
    
            if(res.status === 201){
                const { message } = res.data;
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload: { message }
                });
            }
        } catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: { error: error.response }
            });
        }
    }
}