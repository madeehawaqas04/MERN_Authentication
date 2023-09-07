import React from 'react'
import Datatable from './Datatable';
import SideNavbar from '../../../component/sidebar/Sidenavbar';
import TopNavbar from '../../../component/topbar/Topnavbar';

const List = () => {


  return (
    <>
      <div id="wrapper">
        <SideNavbar />

        <div id="content-wrapper" className="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content">

            {/* <!-- Topbar --> */}
            <TopNavbar />

            <div className='container-fluid'>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                {/* <h1 class="h3 mb-0 text-gray-800">User</h1>
          <NavLink to="/Admin/User/Add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Add data</NavLink>
          <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
        */}
              </div>
              <div className='card shadow mb-4'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <Datatable />

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default List
