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
    <div className="blog-list-wrapper">
      <div className="banner-section"
        style={{
          background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat center center / cover`,
        }}>
        <div className="banner-content">
          <h1>Blog Posts</h1>
        </div>
      </div>

      <div className="content-wrapper">
        <BlogSidebar />

        <div className="blog-container">
          <div className="blog-masonry">
            {blogs.map(blog => (
              <div key={blog.id} className="grid-item">
                <div className="container">
                <div className="author-info">
                    <figure>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/extra-images/avatar-01.jpeg`}
                        alt="Author"
                      />
                    </figure>
                    <div className="pofile-info">
                      <span className="name">{blog.author}</span>
                      <span className="date">Oct 28, 2016</span>
                    </div>
                  </div>
                  <div className="blog-post">
                  
                    <NavLink to={`/blogs/${blog.id}`}>
                      <div className="img-holder">
                        <img src={blog.image_url} alt={blog.title} />
                      </div>
                    </NavLink>
                    <div className="text-holder">
                      <ul className="blog-info">
                        <li>{blog.created_at}</li>
                        <li>{blog.likes} likes</li>
                      </ul>
                      <h4 className="post-title">
                        <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink>
                      </h4>
                      <NavLink className="read-more" to={`/blogs/${blog.id}`}>
                        Read More
                      </NavLink>
                    </div>
                  </div>
                </div>
                </div>
            ))}
              </div>
              
        </div>


          <BlogRightSide />

        </div>
      </div>
      );
}

      export default BlogList;
