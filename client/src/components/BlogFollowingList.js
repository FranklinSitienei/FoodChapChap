import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import BlogSidebar from "./BlogSidebar";
import BlogRightSide from './BlogRightSide';
import './BlogList.css';

function BlogFollowingList() {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [followedAuthors, setFollowedAuthors] = useState({});
  const [loading, setLoading] = useState(true);  // Track loading state
  const navigate = useNavigate();

  const token = localStorage.getItem('user');  // Get the actual token from localStorage
  const isLoggedIn = !!token;  // Check if the token exists

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch blogs from users the current user is following
    fetch('https://foodchapchap-qq3a.onrender.com/users/fetch_following_blogs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Use the token directly
      },
    })
      .then(response => response.json())
      .then(data => {
        // Ensure the response is an array before setting the state
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);  // If the response is not an array, set an empty array
        }
      })
      .catch(error => console.error('Error fetching blogs from followed users:', error))
      .finally(() => setLoading(false));  // Stop loading after fetching is complete
  }, [isLoggedIn, navigate, token]);

  useEffect(() => {
    // Redirect to /blogs after 1 minute if no blogs are displayed
    if (blogs.length === 0) {
      setTimeout(() => {
        navigate('/blogs');
      }, 60000);  // 1 minute
    }
  }, [blogs, navigate]);

  const handleLikeToggle = (blogId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    fetch(`https://foodchapchap-qq3a.onrender.com/blogs/${blogId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Use the token directly
      },
    })
      .then((response) => response.json())
      .then(() => {
        setLikedBlogs((prev) => ({
          ...prev,
          [blogId]: !prev[blogId],
        }));
      })
      .catch((error) => console.error('Error liking/unliking blog:', error));
  };

  const handleFollowToggle = (author) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const action = followedAuthors[author] ? 'unfollow' : 'follow';

    fetch(`https://foodchapchap-qq3a.onrender.com/users/${author}/${action}`, {
      method: action === 'follow' ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Use the token directly
      },
    })
      .then((response) => response.json())
      .then(() => {
        setFollowedAuthors((prev) => ({
          ...prev,
          [author]: !prev[author],
        }));
      })
      .catch((error) => console.error(`Error following/unfollowing author:`, error));
  };

  return (
    <div className="blog-list-wrapper">
      <div
        className="banner-section"
        style={{
          background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat center center / cover`,
        }}
      >
        <div className="banner-content">
          <h1>Following Blogs</h1>
        </div>
      </div>

      <div className="content-wrapper">
        <BlogSidebar />

        <div className="blog-container">
          <div className="blog-masonry">
            {loading ? (
              <p>Loading...</p>  // Show loading indicator while fetching
            ) : blogs.length === 0 ? (
              <div>
                <p>Follow to see recent posts of your followings.</p> {/* Display message */}
              </div>
            ) : (
              blogs.map(blog => (
                <div key={blog.id} className="grid-item">
                  <div className="container">
                    <div className="author-info">
                      <figure>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/extra-images/avatar-01.jpeg`}
                          alt="Author"
                        />
                      </figure>
                      <div className="profile-info">
                        <span className="name">{blog.author}</span>
                        <span className="date">{blog.timestamps}</span>
                        <button
                          className={`follow-button ${followedAuthors[blog.author] ? 'followed' : ''}`}
                          onClick={() => handleFollowToggle(blog.author)}
                        >
                          {followedAuthors[blog.author] ? 'Following' : 'Follow'}
                        </button>
                      </div>
                    </div>

                    <div className="blog-post">
                      <NavLink to={isLoggedIn ? `/blogs/${blog.id}` : '/login'}>
                        <div className="img-holder">
                          <img src={blog.image_url} alt={blog.title} />
                        </div>
                      </NavLink>
                      <div className="text-holder">
                        <div className="blog-info">
                          <div className="views-likes">
                            <button
                              className="like-button"
                              onClick={() => handleLikeToggle(blog.id)}
                            >
                              {likedBlogs[blog.id] ? (
                                <AiFillHeart className="heart-icon liked" />
                              ) : (
                                <AiOutlineHeart className="heart-icon" />
                              )}
                            </button>
                          </div>
                          <h1>{blog.created_date}</h1>
                        </div>
                        <h4 className="post-title">
                          <NavLink to={isLoggedIn ? `/blogs/${blog.id}` : '/login'}>
                            {blog.title}
                          </NavLink>
                        </h4>

                        <NavLink className="read-more" to={`/blogs/${blog.id}`}>
                          Read More
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <BlogRightSide />
      </div>
    </div>
  );
}

export default BlogFollowingList;
