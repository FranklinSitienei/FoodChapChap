import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BlogSidebar from "./BlogSidebar";
import './BlogList.css';
import BlogRightSide from './BlogRightSide';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="main-section">
      <div className="page-section nopadding cs-nomargin" 
        style={{
          marginTop: '0px',
          paddingTop: '80px',
          paddingBottom: '60px',
          marginBottom: '0px',
          background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat scroll 0 0 / cover`,
        }}>
        <div className="container ">
          <div className="row">
            <div className="section-fullwidth col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div className="row">
                    <div className="listing-main-search">
                      {/* Search Form Code */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-content">
        <div className="row">
          
            <BlogSidebar className='sidebar'/>
          
          <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <div className="page-section">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="blog blog-masonry">
                    <div className="row">
                      {blogs.map(blog => (
                        <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6 col-xs-12 grid-item">
                          <div className="blog-post">
                            <NavLink className="trans" to={`/blogs/${blog.id}`}>
                              <div className="img-holder">
                                <figure>
                                  <a href="#"><img src={blog.image_url} alt="" /></a>
                                </figure>
                              </div>
                            </NavLink>
                            <div className="text-holder">
                              <div className="author-info">
                                <ul className="post-options">
                                  <li><i className="icon-clock4"></i>{blog.created_at}<span><a href="#" className="comments-link"> {blog.likes} likes</a> </span></li>
                                </ul>
                              </div>
                              <div className="post-title">
                                <h4><a href="blog-detail.html">{blog.title}...</a></h4>
                              </div>
                              <NavLink className="read-more text-color" to={`/blogs/${blog.id}`}>{blog.author}</NavLink>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <nav>
                    <ul className="pagination">
                      <li><a className="prev page-numbers"> Prev</a></li>
                      <li><a className="page-numbers active">1</a></li>
                      <li><a className="page-numbers" href="#">2</a></li>
                      <li><a className="page-numbers" href="#">3</a></li>
                      <li><a className="page-numbers" href="#">4</a></li>
                      <li><a className="next page-numbers" href="#">Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BlogRightSide/>
      </div>
    </div>
  );
}

export default BlogList;
