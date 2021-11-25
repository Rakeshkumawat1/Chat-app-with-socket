import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from './user.reducer';
import homeReducers from './home.reducers'

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    home: homeReducers,
});

export default rootReducer;
