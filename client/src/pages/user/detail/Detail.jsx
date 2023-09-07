import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from '../../../redux/user/userAction';
import List from '../../order/list/List';
import './Detail.css';
import Chart from '../../../component/chart/Chart';
import SideNavbar from '../../../component/sidebar/Sidenavbar';
import TopNavbar from '../../../component/topbar/Topnavbar';

const Details = () => {

  const [state, setState] = useState([]);
  console.log(state);

  const { id } = useParams("");
  const { user } = useSelector((state) => state.userData);

  console.log(id);

  const navigate = useNavigate();
  let dispatch = useDispatch();

  const getdata = async () => {

    const res = await fetch(`http://localhost:8000/getuserByID/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setState(data)
      console.log("get data");
    }
  }

  useEffect(() => {
    // getdata();
    dispatch(getSingleUser(id));
  }, [])

  useEffect(() => {

    if (user) {
      setState({ ...user })
    }

  }, [user])


  const deleteuser = async (id) => {

    const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      navigate("/User/List")
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


          <div className='container-fluid'>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Welcome {state.name}</h1>
              <NavLink to="/User/List" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Back</NavLink>

            </div>
            <div className='card shadow mb-4'>
              <div className='card-body'>
                <div className="single">

                  <div className="singleContainer">

                    <div className="row top">
                      <div className="left col-lg-4 col-md-4 col-12">
                        <NavLink to={`/User/Edit/${state._id}`}><div className="editButton">Edit</div> </NavLink>
                        <h1 className="title">Information</h1>
                        <div className="item">
                          <img
                            src="/profile.png"
                            // "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                            alt=""
                            className="itemImg"
                          />
                          <div className="details">
                            <h1 className="itemTitle">{state.name}</h1>
                            <div className="detailItem">
                              <span className="itemKey">Email:</span>
                              <span className="itemValue">{state.email}</span>
                            </div>
                            <div className="detailItem">
                              <span className="itemKey">Phone:</span>
                              <span className="itemValue">{state.phone}</span>
                            </div>
                            <div className="detailItem">
                              <span className="itemKey">Address:</span>
                              <span className="itemValue">
                                {state.address}
                              </span>
                            </div>
                            <div className="detailItem">
                              <span className="itemKey">Country:</span>
                              <span className="itemValue">USA</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="right col-lg-8 col-md-8 col-12">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />

                      </div>
                    </div>
                    <div className='row'>
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className='table-responsive'>
                          <div className="bottom">
                            <h1 className="title">Last Transactions</h1>
                            <List />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* <h1 style={{ fontWeight: 400 }}>Welcome {state.name}</h1> */}

            {/* <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/Admin/User/Edit/${state._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span >{state.name}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{state.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occuption: <span>{state.work}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5"><PhoneAndroidIcon />mobile: <span>+91 {state.phone}</span></p>
                            <p className="mt-3"><LocationOnIcon />location: <span>{state.address}</span></p>
                            <p className="mt-3">Description: <span>{state.desc}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card> */}
          </div>

        </div>
      </div>
    </div>

  )
}

export default Details
