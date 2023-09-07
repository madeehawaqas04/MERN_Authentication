import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
//import { updatedata } from '../context/ContextProvider'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../../../redux/user/userAction';
import SideNavbar from '../../../component/sidebar/Sidenavbar';
import TopNavbar from '../../../component/topbar/Topnavbar';

const Edit = () => {

    const navigate = useNavigate("");
    let dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        work: "",
        address: "",
        desc: ""
    })

    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }


    const { id } = useParams("");
    const { user } = useSelector((state) => state.userData);

    useEffect(() => {
        // getdata();
        dispatch(getSingleUser(id));
    }, []);


    useEffect(() => {
        if (user) {
            setState({ ...user })
        }

    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, work, address, phone, desc, age } = state;

        if (!name || !email || !age || !phone || !work || !address || !desc) {
            toast.error("Please fill all fields", { position: "top-center" });
        }
        else {

            dispatch(updateUser(state, id));
            navigate("/User/List")

            setTimeout(function () {
                toast.success("User edited successfully", { position: "top-center" });
            }, 100);
        }

    }

    return (
        <div id="wrapper">
            <SideNavbar />

            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <TopNavbar />

                    <div className="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Edit User</h1>
                            <NavLink to="/User/List" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Back</NavLink>

                        </div>

                        <form className="mt-4">
                            <div className="row">
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label class="form-label labelForm">Name</label>
                                    <input type="text" value={state.name} onChange={setData} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label class="form-label labelForm">email</label>
                                    <input type="email" value={state.email} onChange={setData} name="email" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label class="form-label labelForm">age</label>
                                    <input type="text" value={state.age} onChange={setData} name="age" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label class="form-label labelForm">Mobile</label>
                                    <input type="number" value={state.phone} onChange={setData} name="phone" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label class="form-label labelForm">Work</label>
                                    <input type="text" value={state.work} onChange={setData} name="work" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label class="form-label labelForm">Address</label>
                                    <input type="text" value={state.address} onChange={setData} name="address" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-12 col-md-12 col-12">
                                    <label class="form-label labelForm">Description</label>
                                    <textarea name="desc" value={state.desc} onChange={setData} className="form-control" id="" cols="30" rows="5"></textarea>
                                </div>
                                <div class="mb-3 col-lg-12 col-md-12 col-12">
                                    <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Edit;
