import React , { useState }from 'react'
import { NavLink } from 'react-router-dom'

const SideNavbar = () => {

    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    }


    return (
        <>

            {/* <li className="nav-item">
                <NavLink className="nav-link active" to="/Admin/Customers"></NavLink>
              </li> */}

            {/* <!-- Sidebar --> */}
            <ul className={style} id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">HHCollection Admin</div>
                </NavLink>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/Dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/User/List">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>User</span></NavLink>
                </li>

              
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div>

            </ul>
            {/* <!-- End of Sidebar --> */}

        </>
    )
}

export default SideNavbar
