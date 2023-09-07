import * as types from "./authActionType";
import axios from "axios";

const userSignup = () => ({
    type: types.SIGNUP_USER

});

const userLogout = () => ({
    type: types.LOG_OUT

});
const userReset = () => ({
    type: types.RESET
});

const Fail = (message) => ({
    type: types.FAILURE,
    payload: message,
});


const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user,
});

const LoginUser = (user) => ({
    type: types.SIGNIN_USER,
    payload: user,
});


  

export const signinUser = (user) => {

    return function (dispatch) {
        console.log('in axios');
        axios.post('http://localhost:8000/signinUser', user)
            .then((resp) => {
                console.log('under axios');
                console.log("resp", resp);
                if (resp.data) {
                    localStorage.setItem('user', JSON.stringify(resp.data))
                }
                dispatch(LoginUser(resp.data));
                //dispatch(getUser(resp.data));
            })
            .catch((error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()

                dispatch(Fail(message));
            }
            )

    };

};

export const signupUser = (user) => {
    console.log('signup User');
    return function (dispatch) {
        axios.post('http://localhost:8000/register', user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userSignup("/"));
                // dispatch(loadUsers());
            })
            .catch((error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()

                dispatch(Fail(message));
            }
            )
    };

};

export const reset = () => {
    return function (dispatch) {
        dispatch(userReset());
    };
};


// Logout user
export const logout = () => {
    return function (dispatch) {
        localStorage.removeItem('user')
        dispatch(userLogout());
    };

    
  }