import React from 'react';
import { NavLink } from 'react-router-dom';

function BlogSidebar() {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{
      height: '100%',
    }}>
      <div className="user-account-nav user-account-sidebar">
        <div className="user-nav-list">
          <ul>
            <li><NavLink className="trans" to={`/blogdash`}><i className="icon-dashboard3"></i>Dashboard</NavLink></li>
            <li><NavLink className="trans" to={`/blogdash/posts`}><i className="icon-add_shopping_cart"></i>Posts</NavLink></li>
            <li><NavLink className="trans" to={`/blogs/addblog`}><i className="icon-add_shopping_cart"></i>Create Post</NavLink></li>
            <li><NavLink className="trans" to={`/blogdash/comments`}><i className="icon-comment2"></i>Comments</NavLink></li>
            <li><NavLink className="trans" to={`/blogdash/categories`}><i className="icon-add_shopping_cart"></i>Categories</NavLink></li>
            <li><NavLink className="trans" to={`/blogdash/profile`}><i className="icon-build"></i>Account Settings</NavLink></li>
            <li><NavLink className="trans" to={`/blogdash`}><i className="icon-log-out"></i>Sign out</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BlogSidebar;
