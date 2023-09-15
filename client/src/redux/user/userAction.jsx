import * as types from "./userActionType";
import axios from "axios";


const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const userDeleted = () => ({
    type: types.DELETE_USER
});

const userAdded = () => ({
    type: types.ADD_USER
});

const userUpdated = () => ({
    type: types.UPDATE_USER
});

const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload:user,
});

export const loadUsers = () => {
    console.log('loadUsers');
    return function (dispatch) {
        axios.get('/getalldata')
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUsers(resp.data));

            })
            .catch((error) => console.log(error));
    };

};


export const deleteUser = (id) => {
   
    return function (dispatch) {
        axios.delete(`/deleteuser/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userDeleted());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };

};

export const addUser = (user) => {
   console.log('add user');
    return function (dispatch) {
        axios.post('/registeruser',user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userAdded("/"));
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };

};


export const getSingleUser = (id) => {
   
    return function (dispatch) {
        axios.get(`/getuserByID/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUser(resp.data));
               // dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };

};


export const updateUser = (user,id) => {
   
    console.log(user);
    return function (dispatch) {
        axios.patch(`/updateuser/${id}`,user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userUpdated());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };

};