import React, { useState, useEffect } from 'react';
import './RiderProfile.css';
import Layout from './Layout';
import riderImage from './bike.jpg';
import { BiShow, BiHide } from "react-icons/bi";

function RiderProfile() {
  const [rider, setRider] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
  });

  useEffect(() => {
    // Fetch rider data from local storage if available
    const storedRider = localStorage.getItem('riderData');
    if (storedRider) {
      setRider(JSON.parse(storedRider));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({ ...prevData, showPassword: !prevData.showPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update rider data in local storage
    localStorage.setItem('riderData', JSON.stringify(formData));
    // You may also want to update the rider data on the server
    // Example: send formData to server endpoint for updating rider profile
  };

  return (
    <Layout>
      <div className="rider-background">
        <div className="rider-container">
          <div className="rider-content">
            <h1 className="rider-title">Update Your Profile</h1>
          </div>
          <div className="rider-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type='email'
                  placeholder='Email'
                  className='form-control'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type={formData.showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  className='form-control'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className='show-password-icon' onClick={togglePasswordVisibility}>
                  {formData.showPassword ? <BiHide size={18} /> : <BiShow size={18} />}
                </span>
              </div>
              <div className="form-group form-check">
                <input
                  type='checkbox'
                  name='rememberMe'
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className='form-check-input'
                />
                <label className='form-check-label'>Remember me</label>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RiderProfile;
