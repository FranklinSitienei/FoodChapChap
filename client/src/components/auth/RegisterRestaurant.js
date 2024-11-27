import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaImage, FaFilePdf } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import CheffImage from "./cheff.jpeg";
import "../css/RegisterRestaurant.css";

function RegisterRestaurant() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [permitFile, setPermitFile] = useState(null);
  const [image, setImage] = useState(null);
  const [permitPreview, setPermitPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("brand", brand);
    formData.append("location", location);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("permit_file", permitFile);
    formData.append("image", image);
  
    fetch("https://foodchapchap-qq3a.onrender.com/restaurant/signup", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON from response
        } else {
          return response.json().then((error) => {
            throw new Error(error.error || "An error occurred. Please try again.");
          });
        }
      })
      .then((data) => {
        // Assuming backend sends back { token: 'generated_token', restaurant: { ... } }
        const { token, restaurant } = data;
  
        // Store restaurant data and token in localStorage
        localStorage.setItem("restaurant", JSON.stringify(restaurant));
        localStorage.setItem("restaurant_token", token); // Store the token
  
        setErrorMessage(null);
        navigate('/restaurantdash');
      })
      .catch((error) => {
        setErrorMessage(error.message || "An error occurred. Please try again.");
      });
  }

  // Handle image file selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  // Handle permit file selection
  const handlePermitChange = (e) => {
    const selectedPermit = e.target.files[0];
    if (selectedPermit && selectedPermit.type === 'application/pdf') {
      setPermitFile(selectedPermit);
      // Preview permit
      const reader = new FileReader();
      reader.onloadend = () => {
        setPermitPreview(reader.result);
      };
      reader.readAsDataURL(selectedPermit);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  // Handle image delete
  const handleImageDelete = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Handle permit delete
  const handlePermitDelete = () => {
    setPermitFile(null);
    setPermitPreview(null);
  };

  return (
    <div className="register-container">
      <div className="image-section">
        <img src={CheffImage} alt="Restaurant" className="restaurant-image" />
        <h2>Register Your Restaurant</h2>
        <p>Join our platform and expand your customer base.</p>
      </div>

      <div className="form-section">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <h5 className="modal-title">Register as Restaurant</h5>
        </div>
        <div className="modal-body">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
          <div className="image-uploader">
              {imagePreview ? (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Restaurant"
                    className="preview-image"
                    onClick={handleImageDelete}
                  />
                </div>
              ) : (
                <div className="image-placeholder" onClick={() => document.getElementById('image-upload').click()}>
                  <FaImage size={30} />
                  <p>Click to add image</p>
                </div>
              )}
              <label className="image-upload">
                <input
                  type="file"
                  id="image-upload"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="name-inputs">
              <div className="input-name">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="input-name">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={setPhone}
                placeholder="WhatsApp Number"
                inputClass="form-control"
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Brand Name/Company Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Location/Address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <div className="permit-uploader">
              {permitPreview ? (
                <div className="permit-preview">
                  <embed
                    src={permitPreview}
                    type="application/pdf"
                    className="preview-pdf"
                  />
                  <button className="delete-button" onClick={handlePermitDelete}>
                    X
                  </button>
                </div>
              ) : (
                <div className="permit-placeholder" onClick={() => document.getElementById('permit-upload').click()}>
                  <FaFilePdf size={30} />
                  <p>Click to add permit</p>
                </div>
              )}
              <label className="permit-upload">
                <input
                  type="file"
                  id="permit-upload"
                  style={{ display: 'none' }}
                  onChange={handlePermitChange}
                />
              </label>
            </div>
            <div className="terms-and-conditions">
              <input type="checkbox" required className="checkbox" />
              <NavLink to="/termsandconditions">
                {" "}
                I accept the terms and conditions{" "}
              </NavLink>
            </div>
            <div>
              Already Have an Account? <Link to="/restaurant/login">Login</Link>
            </div>
            <div className="input-container">
              <input type="submit" className="submit-button" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterRestaurant;
