import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function redirectToDashboard(user) {
    navigate("/customerdash");
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            const { token, ...userData } = user;
            localStorage.setItem("user", JSON.stringify({ ...userData, token }));
            onLogin(user);
            setErrorMessage(null);
            redirectToDashboard(user);
          });
        } else {
          setErrorMessage("Login details do not match");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again.");
      });
  }

  const handleGoogleSignInSuccess = credentialResponse => {
    fetch('/google_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentialResponse),
    })
      .then(response => {
        if (response.ok) {
          response.json().then((user) => {
            const { token, ...userData } = user;
            localStorage.setItem("user", JSON.stringify({ ...userData, token }));
            onLogin(user);
            setErrorMessage(null);
            redirectToDashboard(user);
          });
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title foodbakery-dev-login-main-title">
          Login To Your Account
          <br/>
        </h5>
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
          <form onSubmit={handleSubmit} className="wp-user-form webkit">
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
                className="form-control"
                type="password"
                placeholder="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-filed input-field-btn">
              <div className="ajax-login-button input-button-loader">
                <input type="submit" className="cs-bgcolor" value="Log in"/>
              </div>
            </div>
            <div className="footer-element comment-form-social-connect social_login_ui ">
              <div className="social-media">
                <h6><span>Login with</span></h6>
                <ul>
                  <GoogleLogin
                    onSuccess={handleGoogleSignInSuccess}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </ul>
              </div>
            </div>
          </form>
          <p> 
            <Link to="/customerdash">Join FoodChapchap community and look for your Taste! </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
