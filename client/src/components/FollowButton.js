import React, { useState, useEffect } from 'react';
import './css/FollowButton.css';
import { useParams } from 'react-router-dom'


const FollowButton = ({ users }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const { id } = useParams();

  const user = users.find((user) => user.id.toString() === id);
  // Function to handle following/unfollowing
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await fetch(`/users/${user.id}/unfollow`, {
          method: 'DELETE',
          
          // Add any necessary headers here (e.g., authentication headers)
        });
        setIsFollowing(false);
      } else {
        // Follow the user
        await fetch(`/users/${user.id}/follow`, {
          method: 'POST',
          // Add any necessary headers here (e.g., authentication headers)
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  useEffect(() => {
    // Check if the current user is following the profile user
    const checkFollowingStatus = async () => {
      try {
        const response = await fetch(`/users/${user.id}/is_following`);
        if (response.ok) {
          const data = await response.json();
          setIsFollowing(data.isFollowing);
        } else {
          console.error('Error checking following status:', response.statusText);
        }
      } catch (error) {
        console.error('Error checking following status:', error);
      }
    };

    checkFollowingStatus();
  }, [user.id]);

  return (
    <div className="user-profile">
      <h2>{user.username}'s Profile</h2>
      <p>Followers: {user.followers_count}</p>
      <p>Following: {user.following_count}</p>
      <button onClick={handleFollowToggle}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default FollowButton;
