import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import riderImage from './bike.jpg';
import './rider.css'; // Import the CSS file
import { BiShow, BiHide } from 'react-icons/bi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FaBicycle } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";

const RiderRegistration = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    showPassword: false,
    bike_type: '', // New state for bike type
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({ ...prevData, showPassword: !prevData.showPassword }));
  };

  const handleBikeTypeSelection = (bikeType) => {
    setFormData((prevData) => ({ ...prevData, bike_type: bikeType }));
  };

  const navigate = useNavigate();

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setFormData((prevData) => ({
        ...prevData,
        location: address,
        // Optionally, you can include latitude and longitude in your form data
        // latitude: latLng.lat,
        // longitude: latLng.lng,
      }));
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone_number ||
      !formData.password
    ) {
      setModalContent('Please fill in all the required fields.');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/riders/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const userData = await response.json();
        localStorage.setItem('rider_token', userData.token);
        setModalContent('Rider registered successfully. Redirecting to dashboard...');
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/riderdash');
        }, 3000);
      } else {
        const data = await response.json();
        setModalContent(`Registration error: ${data.errors}`);
        setShowModal(true);
      }
    } catch (error) {
      setModalContent(`Error during registration: ${error.message}`);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="rider-container">
      <div className="rider-wrapper">
        <div className="rider-content">
          <h1 className="rider-title">Ready To Hit The Road</h1>
          <p className='body'>Register To Make the World a Better Place To Deliver Food </p>
        </div>
        <img src={riderImage} className="rider-image" alt="Rider" />
      </div>
      <div className='reg-container'>
        <h1 className="br">Brand</h1>

        <div className='reg-form'>
          <div className='title'>
            <h3 className='now'>Register Now</h3>
            <p className='welcome'>Welcome Back! Want to Explore the World</p>
          </div>

          <div className='form'>
            <input
              type='text'
              placeholder='First Name'
              className='input'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Last Name'
              className='input'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email'
              className='input'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type='tel'
              placeholder='Phone Number'
              className='input'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
            />
            <div className='password-container'>
              <input
                type={formData.showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='input'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              <span className='show-password-icon' onClick={togglePasswordVisibility}>
                {formData.showPassword ? <BiHide size={18} /> : <BiShow size={18} />}
              </span>
            </div>
          </div>
          <div className='bike-type-container'>
            <button
              type='button'
              className={`bike-type-button ${formData.bike_type === 'bicycle' ? 'active' : ''}`}
              onClick={() => handleBikeTypeSelection('bicycle')}
            >
              <FaBicycle className='image' />
            </button>
            <button
              type='button'
              className={`bike-type-button ${formData.bike_type === 'motorcycle' ? 'active' : ''}`}
              onClick={() => handleBikeTypeSelection('motorcycle')}
            >
              <FaMotorcycle className='image'/>
            </button>
          </div>
          <div className='bt'>
            <button type="button" className='button' onClick={handleSubmit}>
              Register
            </button>
          </div>
        </div>

        <div className='footer'>
          <p className='p'>Have an account?<Link to="/riderlogin" className='log'>Log in</Link></p>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderRegistration;
