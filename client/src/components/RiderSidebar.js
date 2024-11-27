import React from 'react'
import { NavLink } from 'react-router-dom'


function RiderSidebar() {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div className="user-account-nav user-account-sidebar">
      <div className="user-nav-list">
        <ul>
       

          <li ><NavLink className="trans" to={`/riderdash` }><i className="icon-dashboard3"></i>Dashboard</NavLink></li>
          <li><NavLink className="trans" to={`/riderdash/orders` }><i className="icon-add_shopping_cart"></i>My Current Orders</NavLink></li>
          <li><NavLink className="trans" to={`/riderdash/profile` }><i className="icon-build"></i>Account Settings</NavLink></li>
          <li><NavLink className="trans" to={`/riderdash` }><i className="icon-log-out"></i>Sign out</NavLink></li>

        </ul>
      </div>
    </div>
  </div>
  )
}

export default RiderSidebar