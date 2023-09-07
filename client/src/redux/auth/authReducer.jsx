import * as types from "./authActionType";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
    users: [],
    user: user ? user : null,
    isLoading: true,
    isError: false,
    message: false,
    isSuccess: false,
}

const authReducers = (state = initialState, action) => {
    console.log({ action });
    switch (action.type) {
        case types.SIGNIN_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isSuccess: true,
            };
        case types.SIGNUP_USER:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            };
        case types.FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload,
                user: null,
            };
        case types.RESET:
            return {
                ...state,
                isLoading: false,
                isError: false,
              //  user: user ? user : null,
                message: '',
                isSuccess: false,
            };
            case types.LOG_OUT:
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: null,
                message: '',
                isSuccess: false,
            };
        case types.GET_SINGLE_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }

        default:
            return state;
    }

};

export default authReducers;