import React from 'react';
import { useParams } from 'react-router-dom';
import FollowButton from '../FollowButton';

function BlogProfile({ users }) {
  const { id } = useParams();

  // Check if users data is loading or empty
  if (!users) {
    return <div>Loading...</div>;
  }

  // Find the user with the specified ID
  
  const user = users.find((user) => user.id.toString() === id);

  // Check if user is not found
  if (!user) {
    return <div className="blog-container">User not found for ID: {id}</div>;
  }

  return (
    <>
      <div>
        <h1>Blog Profile</h1>
        <div className="blogger-page" key={user.id}>
          <h1>Blogger Profile</h1>
          <p>
            <span className="profile-label">Username:</span> {user.username}
          </p>
          <p>
            <span className="profile-label">Email:</span> {user.email}
          </p>
          <p>
            <span className="profile-label">Address:</span> {user.address}
          </p>
          <p>
            <span className="profile-label">Phone:</span> {user.phone}
          </p>
        </div>
        <div>
          <FollowButton user={user} />
        </div>
      </div>
    </>
  );
}

export default BlogProfile;
