import axios from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
    return async (dispatch) => {

        try {
            dispatch({ type: authConstants.LOGIN_REQUEST });

            const res = await axios.post(`/admin/auth/signin`, {
                ...user

            });
            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: error.response }
                // payload: { error: res.data.message }
            });
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            });
        }
    }
}

export const signOut = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post('/admin/auth/signout');

        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}


