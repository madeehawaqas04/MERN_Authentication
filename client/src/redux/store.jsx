import { createStore,applyMiddleware } from 'redux';
import logger from "redux-logger";
import reduxThuck from "redux-thunk";
import rootReducer from "./root-reducer";

//const middlewares=[reduxThuck];


const store= createStore(rootReducer,applyMiddleware(reduxThuck));
export default store;