import * as types from "./userActionType";

const initialState = {
    users: [],
    user: {},
    loading: true,
}

const userReducers = (state = initialState, action) => {
    console.log({action});
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.DELETE_USER:
            return {
                ...state,
                loading: false,
            };
        case types.ADD_USER:
        case types.UPDATE_USER:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }

        default:
            return state;
    }

};

export default userReducers;