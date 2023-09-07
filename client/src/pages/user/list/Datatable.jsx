import React, { useEffect, useState, useContext, useRef } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '../../../component/dialog/Dialog';
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, loadUsers } from '../../../redux/user/userAction';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import "./datatable.css";


const Datatable = () => {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLogin } = useSelector(state => state.authData);

    // useEffect(() => {
    //     console.log('userlist');
    //     console.log(userLogin);

    //     if (userLogin==null) {
    //        // navigate('/login')
    //     }

    // }, [userLogin])

    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        //Update
        name: ""
    });

    const handleDialog = (message, isLoading, name) => {
        setDialog({
            message,
            isLoading,
            //Update
            name
        });
    };
    const idRef = useRef();
    const handleDelete = (e, row) => {
        //Update
        e.stopPropagation();
        handleDialog("Are you sure you want to delete?", true, row.name);
        idRef.current = row._id;
    };


    const areUSureDelete = (choose) => {
        if (choose) {
            deleteuser(idRef.current);
            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };


    //using useselector for getting data from store
    const { users } = useSelector(state => state.userData);

    useEffect(() => {
        dispatch(loadUsers());
    }, [])

    const deleteuser = async (id) => {
        dispatch(deleteUser(id));
        toast.success("user deleted", { position: "top-center" });
    }

    const columns = [
        // { field: '_id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200, headerClassName: 'header' },
        { field: 'email', headerName: 'Email', width: 200, headerClassName: 'header' },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 70,
            headerClassName: 'header'
        },
        {
            field: 'actions', headerName: 'Actions',
            headerClassName: 'header',
            width: 400,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <NavLink to={`/User/Details/${params.row._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                        <NavLink to={`/User/Edit/${params.row._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger deleteButton" onClick={(e) => handleDelete(e, params.row)}
                        ><DeleteOutlineIcon /></button>
                    </div>
                );
            }
        }
    ];


    const onButtonClick = (e, row) => {
        e.stopPropagation();
        //do whatever you want with the row
    };


    return (
        <>
        
            <div className="datatableTitle">
                User
                <NavLink to="/User/Add" className="link">
                    Add User
                </NavLink>
            </div>
            <Box sx={{
                height: 650, width: '100%', '& .header': {
                    backgroundColor: '',
                    color: '',
                    fontSize: 18
                },
            }}>
                <DataGrid sx={{
                    m: 2,
                    boxShadow: 2,
                    border: 2,
                    borderColor: '#e8ebed',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
                    getRowId={(row) => row._id}
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[3, 10]}
                    // checkboxSelection
                />
            </Box>
            
            <ToastContainer />
            {/* <Dialog /> */}

            {dialog.isLoading && (
                <Dialog
                    //Update
                    nameProduct={dialog.name}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                />
            )}

        </>
    )
}

export default Datatable
