// BlogProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogProfile.css';

function BlogProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('user');

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
      const response = await fetch('/users/show', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('/blogs/my_posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMyPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const fetchFollowingPosts = async () => {
    try {
      const response = await fetch('/users/fetch_following_blogs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFollowingPosts(data);
    } catch (error) {
      console.error("Error fetching following posts:", error);
    }
  };

  return (
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
            <p>{userDetails?.name}</p>
            <p>{userDetails?.address}</p>
            <p>{userDetails?.phone}</p>
          </div>
        </div>
      </div>

      <div className="blogs-section">
        <h3>My Posts</h3>
        <div className="blog-list">
          {myPosts.map((post) => (
            <div key={post.id} className="blog-item">
              <h4>{post.title}</h4>
              <p>{post.created_at}</p>
              <button onClick={() => navigate(`/blogs/${post.id}`)}>View Details</button>
            </div>
          ))}
        </div>

        <h3>Following</h3>
        <div className="blog-list">
          {followingPosts.map((post) => (
            <div key={post.id} className="blog-item">
              <h4>{post.title}</h4>
              <p>{post.created_at}</p>
              <button onClick={() => navigate(`/blogs/${post.id}`)}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogProfile;
