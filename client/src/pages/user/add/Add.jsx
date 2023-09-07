import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/user/userAction';
import SideNavbar from '../../../component/sidebar/Sidenavbar';
import TopNavbar from '../../../component/topbar/Topnavbar';

const Add = () => {

    // const { udata, setUdata } = useContext(adddata);

    const navigate = useNavigate();
    let dispatch = useDispatch();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        work: "",
        address: "",
        desc: ""
    })

    const setdata = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, address, phone, desc, age } = inpval;

        if (!name || !email || !age || !phone || !work || !address || !desc) {
            toast.error("Please fill all fields", { position: "top-center" });
        }
        else {

            dispatch(addUser(inpval));
            navigate("/User/List")
            setTimeout(function () {
                toast.success("User added successfully", { position: "top-center" });
            }, 100);


            // const res = await fetch('sshttp://localhost:8000/registeruser', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         name, email, work, address, phone, desc, age
            //     })
            // });

            // const data = await res.json();
            // console.log(data);

            // if (res.status === 422 || !data) {
            //     console.log("error ");
            //     alert("error");

            // } else {
            //     navigate("/Admin/User/List")
            //     //setUdata(data)
            //     setTimeout(function(){
            //         toast.success("User added successfully", { position: "top-center" });
            //     }, 100);
            //    // console.log("data added");

            // }
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
                        {/* <NavLink to="/Admin/User/UserList">home</NavLink> */}

                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Create New User</h1>
                            <NavLink to="/User/List" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Back</NavLink>

                        </div>

                        <form className="mt-4">
                            <div className="row">
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputEmail1" class="form-label labelForm">Name</label>
                                    <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputPassword1" class="form-label labelForm">Email</label>
                                    <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputPassword1" class="form-label labelForm">Age</label>
                                    <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputPassword1" class="form-label labelForm">Phone</label>
                                    <input type="number" value={inpval.phone} onChange={setdata} name="phone" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputPassword1" class="form-label labelForm">Work</label>
                                    <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputPassword1" class="form-label labelForm">Address</label>
                                    <input type="text" value={inpval.address} onChange={setdata} name="address" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3 col-lg-12 col-md-12 col-12">
                                    <label for="exampleInputPassword1" class="form-label labelForm">Description</label>
                                    <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                                </div>
                                <div class="mb-3 col-lg-12 col-md-12 col-12">
                                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
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
export default Add;
