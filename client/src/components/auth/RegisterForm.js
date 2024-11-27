import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function RegisterForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function redirectToDashboard(user) {
    window.location.href = "/customerdash";
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://foodchapchap-qq3a.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        address,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify(user));
            onLogin(user);
            setErrorMessage(null);
            redirectToDashboard(user);
          });
        } else {
          setErrorMessage("Your passwords do not match");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again.");
      });
  }

  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title foodbakery-dev-login-main-title">Register as User/Customer</h5>
      </div>
      <div className="modal-body">
        {errorMessage && (
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            {errorMessage}
          </p>
        )}

        <p className="foodbakery-dev-login-top-msg"></p>
        <div className="cs-login-pbox">
          <div className="status status-message"></div>

          <form onSubmit={handleSubmit}>
            <div className="input-filed">
              <select className="chosen-select" name="user_type" aria-label="Default select example" style={{
                marginBottom: '23px',
                color: 'black',
                paddingBottom: '6px',
              }}>
                <option value="customer" selected>Customer</option>
              </select>
            </div>

            <div className="input-filed">
              <i className="icon-user4"></i>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Phone Number"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                className="form-control"
                type="password"
                id="password_confirmation"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <span className="signup-alert">
              <b><input
                type="checkbox" required
              /></b> <NavLink to="/termsandconditions">I accept the terms and conditions </NavLink>
            </span>

            <div className="input-filed input-field-btn">
              <div className="ajax-login-button input-button-loader">
                <input type="submit" className="cs-bgcolor" value="Register" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterForm;
