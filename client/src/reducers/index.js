import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from './user.reducer';
import homeReducers from './home.reducers';
import allUserListReducers from './allUserList.reducers';

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    home: homeReducers,
    userList: allUserListReducers,
});

export default rootReducer;
