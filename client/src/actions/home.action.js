import axios from "../helpers/axios"
import { chatConstants } from "./constants"

export const homeData = (form) => {
    return async (dispatch) => {

        try {
            // dispatch({ type: authConstants.LOGIN_REQUEST });
            const res = await axios.post(`/test/socket`, {
                ...form
            });
            if (res.status === 200) {
                console.log(res.data)
                // const { token, user } = res.data;
                // localStorage.setItem('token', token);
                // localStorage.setItem('user', JSON.stringify(user));
                // dispatch({
                //     type: authConstants.LOGIN_SUCCESS,
                //     payload: {
                //         token, user
                //     }
                // });
            }
        } catch (error) {
            console.log(error)

            // dispatch({
            //     type: authConstants.LOGIN_FAILURE,
            //     payload: { error: error.response }
            //     // payload: { error: res.data.message }
            // });
        }
    }
}