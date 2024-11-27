import React, { useEffect, useState } from 'react';
import CustomerSidebar from './customersidebar';
import CustomerHeader from './CustomerHeader';

function CustomerProfile() {
  const [userr, setUserr] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    fetch('/me')
      .then((response) => response.json())
      .then((user) => {
        setUserr(user);
        setFullName(user.username);
        setEmail(user.email);
        setPhoneNumber(user.phone);
        setHomeAddress(user.address);
        setProfilePic(user.profile_pic ? user.profile_pic.url : null);
      });
  }, []);

  useEffect(() => {
    if (userr) {
      fetch('/user/orders')
        .then((response) => response.json())
        .then((orders) => setUserOrders(orders));
    }
  }, [userr]);

  const handleFileChange = (event) => {
    setUpdatedImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', fullName);
    formData.append('email', email);
    formData.append('phone', phoneNumber);
    formData.append('address', homeAddress);
    if (updatedImage) {
      formData.append('profile_pic', updatedImage);
    }

    fetch(`/users/${userr.id}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.ok ? response.json() : Promise.reject('Failed to update user.'))
      .then((updatedUser) => {
        setUserr(updatedUser);
        setProfilePic(updatedUser.profile_pic ? updatedUser.profile_pic.url : null);
        setUpdatedImage(null);
        console.log('User updated:', updatedUser);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const imagePreviewUrl = updatedImage
    ? URL.createObjectURL(updatedImage)
    : profilePic
      ? profilePic
      : `${process.env.PUBLIC_URL}/assets/extra-images/default-profile.jpg`;

  return (
    <>
      {userr && (
        <div className="main-section">
          <CustomerHeader userr={userr} />

          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                <CustomerSidebar />

                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="user-dashboard">
                    <h5>Account Settings</h5>
                    <div className="user-holder">
                      <div className="user-profile">
                        <div className="element-title has-border"></div>
                        <div className="row">
                          <form id="publisher_profile" onSubmit={handleSubmit}>
                            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Full Name*</label>
                                    <input
                                      type="text"
                                      className="foodbakery-dev-req-field"
                                      value={fullName}
                                      onChange={(e) => setFullName(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Email Address *</label>
                                    <input
                                      type="text"
                                      className="foodbakery-dev-req-field"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Phone Number *</label>
                                    <input
                                      type="text"
                                      className="foodbakery-dev-req-field"
                                      value={phoneNumber}
                                      onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Home Address *</label>
                                    <input
                                      type="text"
                                      className="foodbakery-dev-req-field"
                                      value={homeAddress}
                                      onChange={(e) => setHomeAddress(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <div className="user-profile-images">
                                <div className="current-img">
                                  <figure>
                                    <img src={imagePreviewUrl} alt="Profile" />
                                  </figure>
                                  <h6>{userr.username}</h6>
                                  <p>{userr.phone}</p>
                                  <p>{userr.email}</p>
                                  <p>{userr.address}</p>
                                </div>
                                <div className="upload-file">
                                  <input
                                    id="file-1"
                                    type="file"
                                    className="hide"
                                    onChange={handleFileChange}
                                  />
                                  <label htmlFor="file-1" className="upload-button">
                                    <span>Upload Picture</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="opt-conts">
                                <button type="submit" className="btn-submit">
                                  Save
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="element-title has-border">
                                <h5>Change Password</h5>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>Current Password*</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>New Password*</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>Confirm New Password*</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <button name="button" type="button" className="btn-submit">
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerProfile;
