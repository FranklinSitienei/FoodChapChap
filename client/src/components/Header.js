import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(response => {
      if (response.ok) {
        // Clear user data from local storage or session storage
        localStorage.removeItem("user");
        localStorage.removeItem("restaurant");
        localStorage.removeItem("rider_token");

        // Call onLogout to clear user state
        onLogout();

        // Redirect to login page or home page
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    }).catch(error => {
      console.error("Error during logout:", error);
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));
  const riderToken = localStorage.getItem("rider_token");

  // Determine the logged-in entity
  let loggedInEntity = null;
  if (user) {
    loggedInEntity = user;
  } else if (restaurant) {
    loggedInEntity = restaurant;
  } else if (riderToken) {
    loggedInEntity = riderToken;  // Assuming you fetch rider's username separately if needed
  }

  // Determine the dashboard path
  let dashboardPath = process.env.PUBLIC_URL;
  if (user) {
    dashboardPath += "/customerdash";
  } else if (restaurant) {
    dashboardPath += "/restaurantdash";
  } else if (riderToken) {
    dashboardPath += "/riderdash";
  }

  return (
    <>
      <header id="header" className="sticky-header header-full-width transparent-header fancy">
        <div className="main-header">
          <div className="wide">
            <div className="nav-left wow fadeOutLeft" data-wow-duration="2s" style={{ marginTop: '3px' }}>
              <div className="main-nav">
                <nav id="site-navigation" className="main-navigation">
                  <ul className="fancy-left-menu">
                    <li>
                      <NavLink className="trans" to={`${process.env.PUBLIC_URL}`}>Home</NavLink>
                    </li>
                    <li>
                      <NavLink className="trans" to={`${process.env.PUBLIC_URL}/restaurants`}>Restaurants</NavLink>
                    </li>
                    <li><a href="/blogs">Blogs</a></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="logo">
              <figure>
                <a href="foodstop.html" className="light-logo">
                  <img src="assets/extra-images/logonew.png" alt="Food Stop" />
                </a>
                <a href="foodstop.html" className="dark-logo">
                  <img src="assets/extra-images/logonew.png" alt="Food Stop" />
                </a>
              </figure>
            </div>

            {/* <div id="only-phone" style={{ display: 'flex', marginTop: '3px', marginRight: '10px' }}>
                  <p style={{ marginLeft: '50px' }}>
                    <NavLink className="trans" to={`${process.env.PUBLIC_URL}`}>Home</NavLink>
                  </p>
                  <p style={{ marginLeft: '20px' }}>
                    <NavLink className="trans" to={`${process.env.PUBLIC_URL}/restaurants`}>Restaurants</NavLink>
                  </p>
                  <p style={{ marginLeft: '20px' }}><a href="/blogs">Blogs</a></p>
                </div> */}

            <div className="nav-right wow fadeOutRight" data-wow-duration="2s" style={{ marginTop: '3px', marginLeft: '20px'}}>
              <div className="main-nav">

                <nav className="main-navigation">
                  <ul className="fancy-right-menu">
                    {loggedInEntity ? (
                      <>
                        <li>
                          <NavLink className="get-start-btn btn btn-sm" style={{
                            backgroundColor: 'rgb(89, 195, 50)',
                            borderRadius: '3px',
                            color: '#fff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '12px',
                            fontWeight: '500',
                            letterSpacing: '0',
                            lineHeight: 'normal',
                            padding: '10px 15px',
                            textTransform: 'uppercase',
                            margin: '0 0 0 12px',
                          }} to={dashboardPath}>{loggedInEntity.username || loggedInEntity.brand || loggedInEntity.first_name}</NavLink>
                        </li>

                        <li>
                          <button className="get-start-btn btn btn-sm" onClick={handleLogout} style={{
                            backgroundColor: '#c33332',
                            borderRadius: '3px',
                            color: '#fff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '12px',
                            fontWeight: '700',
                            letterSpacing: '0',
                            lineHeight: 'normal',
                            padding: '10px 15px',
                            textTransform: 'uppercase',
                            margin: '0 0 0 12px',
                            border: 'none',
                            cursor: 'pointer'
                          }}>Logout</button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <a className="cs-color cs-popup-joinus-btn login-popup" data-target="#sign-in" data-toggle="modal" href="#user-register" style={{ color: "#e51b1b" }}>Login / Register</a>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
