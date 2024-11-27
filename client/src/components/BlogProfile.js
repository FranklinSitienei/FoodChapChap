import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogFollowingList from './BlogFollowingList';
import BlogSidebar from "./BlogSidebar";
import { NavLink } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // import missing components
import './BlogProfile.css';

function BlogProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [viewMyPosts, setViewMyPosts] = useState(true);
  const [viewFollowingPosts, setViewFollowingPosts] = useState(false); // New state for following posts view
  const [likedBlogs, setLikedBlogs] = useState({});
  const [followedAuthors, setFollowedAuthors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('user');
  const isLoggedIn = Boolean(token); // define isLoggedIn

  useEffect(() => {
    if (token) {
      fetchUserDetails();
      fetchUserPosts();
      fetchFollowingPosts();
    } else {
      navigate('/login');
    }
  }, [token]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('https://foodchapchap-qq3a.onrender.com/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('https://foodchapchap-qq3a.onrender.com/users/my_posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMyPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setMyPosts([]);
    }
  };

  const fetchFollowingPosts = async () => {
    try {
      const response = await fetch('https://foodchapchap-qq3a.onrender.com/users/fetch_following_blogs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFollowingPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs from followed users:', error);
      setFollowingPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = (blogId) => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`https://foodchapchap-qq3a.onrender.com/blogs/${blogId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    if (!token) {
      navigate('/login');
      return;
    }

    const action = followedAuthors[author] ? 'unfollow' : 'follow';

    fetch(`https://foodchapchap-qq3a.onrender.com/users/${author}/${action}`, {
      method: action === 'follow' ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
      ></div>
      <div className="blog-profile-wrapper">
        <div className="profile-section">
          <div className="profile-header">
            <img
              src={userDetails?.profile_pic || `${process.env.PUBLIC_URL}/assets/extra-images/default-avatar.jpg`}
              alt="Profile"
              className="profile-picture"
            />
            <div className="profile-info">
              <h2>{userDetails?.username}</h2>
              <button
                className={`follow-button ${followedAuthors[userDetails?.username] ? 'followed' : ''}`}
                onClick={() => handleFollowToggle(userDetails?.username)}
              >
                {followedAuthors[userDetails?.username] ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
          <div className="profile-details">
            <p>{userDetails?.name}</p>
            <div className="stats">
              <span>{myPosts.length} Posts</span>
              <span>{userDetails?.followers || 0} Followers</span>
              <span>{userDetails?.following || 0} Following</span>
            </div>
          </div>
        </div>

        <div className="posts-toggle">
          <button
            className={`toggle-button ${viewMyPosts ? 'active' : ''}`}
            onClick={() => {
              setViewMyPosts(true);
              setViewFollowingPosts(false); // Set following posts to false
            }}
          >
            My Posts
          </button>
          <button
            className={`toggle-button ${viewFollowingPosts ? 'active' : ''}`}
            onClick={() => {
              setViewMyPosts(false); // Set my posts to false
              setViewFollowingPosts(true); // Set following posts to true
            }}
          >
            Following
          </button>
        </div>

        <div className="blogs-section">
          {viewMyPosts ? (
            myPosts.length > 0 ? (
              myPosts.map((post) => (
                <div key={post.id} className="grid-item">
                  <div className="container">
                  <div className="author-info">
                    <figure>
                      <img
                        src={post.user.profile_pic}
                        alt="Author"
                      />
                    </figure>
                    <div className="profile-info">
                      <span className="name">{post.author}</span>
                      <span className="date">{post.timestamps}</span>
                      <button
                        className={`follow-button ${followedAuthors[post.author] ? 'followed' : ''}`}
                        onClick={() => handleFollowToggle(post.author)}
                      >
                        {followedAuthors[post.author] ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>

                  <div className="blog-post">
                    <NavLink to={isLoggedIn ? `/blogs/${post.id}` : '/login'}>
                      <div className="img-holder">
                        <img src={post.image_url} alt={post.title} />
                      </div>
                    </NavLink>
                    <div className="text-holder">
                      <div className="blog-info">
                        <div className="views-likes">
                          <button
                            className="like-button"
                            onClick={() => handleLikeToggle(post.id)}
                          >
                            {likedBlogs[post.id] ? (
                              <AiFillHeart className="heart-icon liked" />
                            ) : (
                              <AiOutlineHeart className="heart-icon" />
                            )}
                          </button>
                        </div>
                        <h1>{post.created_date}</h1>
                      </div>
                      <h4 className="post-title">
                        <NavLink to={isLoggedIn ? `/blogs/${post.id}` : '/login'}>
                          {post.title}
                        </NavLink>
                      </h4>

                      <NavLink className="read-more" to={`/blogs/${post.id}`}>
                        Read More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <p>No posts available</p>
            )
          ) : (
            followingPosts.map((blog) => (
              <div key={blog.id} className="grid-item">
                <div className="container">
                  <div className="author-info">
                    <figure>
                      <img
                        src={blog.user.profile_pic}
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
    </div>
  );
}

export default BlogProfile;
