import React, { useEffect, useState, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//import { UserContext } from ".../App";
import Dialog from '../Dialog';
import { useDispatch, useSelector } from 'react-redux'
//import loadUsers  from '.../redux/loadUsers';
import { deleteUser, loadUsers } from '../../../redux/userAction';

//import { loadUsers } from '../../redux/action';

const List2 = () => {

  let dispatch = useDispatch();

  //You can put all product information into diaglog
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
  const handleDelete = (id, name) => {
    //Update
    handleDialog("Are you sure you want to delete?", true, name);
    idRef.current = id;
  };


  const areUSureDelete = (choose) => {
    if (choose) {
      //  setProducts(products.filter((p) => p.id !== idProductRef.current));
      deleteuser(idRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };



  //const { state, dispatch } = useContext(UserContext);

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:8000/getalldata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(res);
      const data = await res.json();
      console.log(data);

      //setUserdata(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        toast.error(error, { position: "top-center" });

        throw error;
      }

    }
    catch (err) {
      console.log(err);
      toast.error(err, { position: "top-center" });
    }
  }

  // useEffect(() => {
  //   getData();

  // }, []);

  //using useselector for getting data from store
  const { users } = useSelector(state => state.userData);

  useEffect(() => {
    dispatch(loadUsers());
  }, [])

  const deleteuser = async (id) => {

    // const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });

    dispatch(deleteUser(id));
    //dispatch(loadUsers());

    toast.success("user deleted", { position: "top-center" });

    // const deletedata = await res2.json();
    // console.log(deletedata);

    // if (res2.status === 422 || !deletedata) {
    //   console.log("error");
    //   toast.error("Failed : User not delete", { position: "top-center" });
    // } else {
    //   console.log("user deleted");
    //   toast.success("user deleted", { position: "top-center" });
    //   // dispatch({ type: 'USERDELETE', payload: true })

    //   getData();
    // }

  }

  return (
    <>

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/Admin/User/Add" className="btn btn-primary">Add data</NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                {/* <th scope="col">id</th> */}
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((element, id) => (
                <tr key={element._id}>
                  {<th scope="row">{id + 1}</th>}
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.work}</td>
                  <td>{element.phone}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`/Admin/User/Details/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                    <NavLink to={`/Admin/User/Edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                    <button className="btn btn-danger" onClick={() => handleDelete(element._id, element.name)}
                    ><DeleteOutlineIcon /></button>
                    {/* onClick={() => deleteuser(element._id)} */}
                  </td>
                </tr>

              )
              )
              }
            </tbody>
          </table>


        </div>
      </div>


  

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

export default List2
