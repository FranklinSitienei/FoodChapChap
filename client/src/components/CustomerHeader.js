import React, { useState, useEffect } from 'react';

function CustomerHeader({ userr }) {
  const defaultImage = `${process.env.PUBLIC_URL}/assets/extra-images/team-medium-img1.jpg`; // Default image URL
  const [profilePic, setProfilePic] = useState(defaultImage);

  useEffect(() => {
    if (userr && userr.profile_pic) {
      // Ensure the profile_pic URL is valid
      const userImage = userr.profile_pic.url || userr.profile_pic; // Handle cases where profile_pic might be a URL or filename
      setProfilePic(userImage ? userImage : defaultImage);
    }
  }, [userr]);

  return (
    <div
      className="page-section restaurant-detail-image-section"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat scroll 0 0 / cover`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="company-info-detail">
              <div className="company-info">
                <div className="img-holder">
                  <figure>
                    <img
                      src={profilePic}
                      alt="Profile"
                      onError={() => setProfilePic(defaultImage)} // Fallback to default image if there's an error
                    />
                  </figure>
                </div>
                <div className="text-holder">
                  <span className="restaurant-title" style={{ textTransform: 'capitalize' }}>
                    {userr.username} (Customer Owner)
                  </span>
                  <ul className="user-info-contact">
                    <li className="cell">
                      <i className="icon-phone"></i>
                      <a href={`tel:${userr.phone}`}>{userr.phone}</a>
                    </li>
                    <li className="email">
                      <i className="icon-mail5"></i>
                      <a href={`mailto:${userr.email}`}>{userr.email}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHeader;
