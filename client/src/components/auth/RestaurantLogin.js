import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import CheffImage from "./cheff.jpeg";
import "../css/RegisterRestaurant.css";

function RestaurantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/restaurant/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((restaurant) => {
            // Store restaurant data and token in local storage
            localStorage.setItem("restaurant", JSON.stringify(restaurant));        
            setErrorMessage(null);
            navigate('/restaurantdash');
          });
        } else {
          setErrorMessage("Invalid email or password");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again.");
      });
  }

  return (
    <div className="register-container">
      <div className="image-section">
        <img
          src={CheffImage}
          alt="Restaurant"
          className="restaurant-image"
        />
        <h2>Login Your Restaurant</h2>
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
          <h5 className="modal-title">Login as Restaurant</h5>
        </div>
        <div className="modal-body">
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
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
                onChange={(e) =>
                  setPasswordConfirmation(e.target.value)
                }
                required
              />
            </div>
            <div>
              You Don't Have An Account! <Link to="/restaurant/register">Sign Up</Link>
            </div>
            <div className="input-container">
              <input
                type="submit"
                className="submit-button"
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RestaurantLogin;
