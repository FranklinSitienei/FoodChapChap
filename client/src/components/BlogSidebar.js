import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiCollapseHorizontal } from "react-icons/bi";
import './BlogSidebar.css';

function BlogSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`blog-sidebar ${isExpanded ? "expanded" : "collapsed"}`} style={{ height: "100%" }}>
      <ul>
        <li>
          <NavLink className="trans" to={`/blogs`}>
            <i className="icon-dashboard3"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="trans" to={`/blogs/following`}>
            <i className="icon-feed"></i>
            <span>Following</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="trans" to={`/blogs/addblog`}>
            <i className="icon-add"></i>
            <span>Upload</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="trans" to={`/blogs/categories`}>
            <i className="icon-list"></i>
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="trans" to={`/blogs/profile`}>
            <i className="icon-build"></i>
            <span>Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="trans" to={`/blogs`}>
            <i className="icon-log-out"></i>
            <span>Sign out</span>
          </NavLink>
        </li>
      </ul>
      <div className="toggle-icon" onClick={toggleSidebar}>
        <BiCollapseHorizontal size={24} />
      </div>
    </div>
  );
}

export default BlogSidebar;
