import './App.css';
import React, { useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import SideNavbar from './component/sidebar/Sidenavbar';
import TopNavbar from './component/topbar/Topnavbar';
import Footer from './component/footer/Footer';
import Dashboard from './pages/dashboard/Dashboard';
import UserList from './pages/user/list/List';
import AddUser from './pages/user/add/Add';
import EditUser from './pages/user/edit/Edit';
import DetailUser from './pages/user/detail/Detail';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function App() {
  const { user } = useSelector(state => state.authData);
  const navigate = useNavigate();
  console.log(user);
 
  /* useEffect(() => {
     console.log('dashboard');
     console.log(user);
 
     if (user==null) {
         navigate('/login')
     }
 
 }, [user])*/

  // if(!user) {
  //   return <Login/>
  // }

  return (
    <>

      
      {/* <Dashboard/> */}
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">

        {/* //side_bar */}

        {/* {user ? <SideNavbar /> : <Login />} */}



        {/* <SideNavbar /> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content">

            {/* <!-- Topbar --> */}
            {/* {user ? <TopNavbar /> : ''} */}
            {/* <TopNavbar /> */}

            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path="/User/List" element={(user ==null ? <Login/>:<UserList /> )} />
              <Route path="/User/Add" element={(user==null ? <Login/> : <AddUser />)} />
              <Route path='/User/Edit/:id' element={(user==null ? <Login/> : <EditUser/>)} />
              <Route path='/User/Details/:id' element={(user==null ? <Login/>:<DetailUser />)} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Signup' element={<Signup />} />

            </Routes>


          </div>

          <Footer />

          {/* <!-- Scroll to Top Button--> */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>


        </div>
      </div>


    </>
  );
}

export default App;
