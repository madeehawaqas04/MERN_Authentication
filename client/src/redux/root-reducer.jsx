import {combineReducers} from "redux";
import userReducers from "./user/reducer";
import authReducer from "./auth/authReducer";

const rootReducer=combineReducers({
userData:userReducers,
authData:authReducer,
});

export default rootReducer;