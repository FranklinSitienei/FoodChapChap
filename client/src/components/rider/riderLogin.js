import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file
import riderImage from './bike.jpg';
import { BiShow, BiHide } from 'react-icons/bi';

const RiderLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
    loading: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setLoginData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const togglePasswordVisibility = () => {
    setLoginData((prevData) => ({ ...prevData, showPassword: !prevData.showPassword }));
  };

  const handleLogin = async () => {
    setLoginData((prevData) => ({ ...prevData, loading: true }));
    try {
      const response = await fetch('/riders/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('rider_token', userData.token);  // Save token to localStorage
        navigate('/riderdash');  // Navigate on success
      } else {
        const data = await response.json();
        setModalContent(`Login error: ${data.error}`);
        setShowModal(true);
      }
    } catch (error) {
      setModalContent(`Error during login: ${error.message}`);
      setShowModal(true);
    } finally {
      setLoginData((prevData) => ({ ...prevData, loading: false }));
    }
  };
  

  return (
    <div className="rider-container">
      <div className="rider-wrapper">
        <div className="rider-content">
          <h1 className="rider-title">Ready To Hit The Road</h1>
          <p className="body">Then Log In, We starting Exploring the World Together </p>
        </div>
        <img src={riderImage} className="rider-image" alt="Rider" />
      </div>
      <div className="reg-container">
        <h1 className="br">Brand</h1>

        <div className="reg-form">
          <div className="title">
            <h3 className="now">Log In</h3>
            <p className="welcome">Welcome Back! It's Time To Explore</p>
          </div>

          <div className="form">
            <input
              type="email"
              placeholder="Email"
              className="input"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            <div className="password-container">
              <input
                type={loginData.showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <span className="show-password-icon" onClick={togglePasswordVisibility}>
                {loginData.showPassword ? <BiHide size={18} /> : <BiShow size={18} />}
              </span>
            </div>
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginData.rememberMe}
                onChange={handleChange}
                className="check"
              />
              Remember me
            </label>
          </div>
          <div className="bt">
            <button className="button" onClick={handleLogin} disabled={loginData.loading}>
              {loginData.loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
          {/* Modal */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <p>{modalContent}</p>
              </div>
            </div>
          )}
        </div>
        <div className="footer">
          <p className="p">
            Don't have an account? <Link to="/rider" className="log">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderLogin;
