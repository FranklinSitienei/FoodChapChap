import React, { useEffect, useState } from 'react';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantBookings() {
  const [userr, setUserr] = useState(null);
  const [restaurant, setRestaurant] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user information
    fetch("/me")
      .then((response) => response.json())
      .then((user) => setUserr(user));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // Fetch bookings information
    if (restaurant.id) {
      fetch(`/restaurants/${restaurant.id}/bookings`)
        .then((response) => response.json())
        .then((bookings) => setBookings(bookings));
    }
  }, [restaurant.id]);

  console.log(bookings);

  useEffect(() => {
    // Fetch user's orders when userr changes
    if (userr) {
      fetch(`/restaurants/${userr.id}`)
        .then((response) => response.json())
        .then((rest) => setRestaurant(rest));
    }
  }, [userr]);

  return (
    <>
      {userr && (
        <div className="main-section">
          <RestaurantHeader userr={userr} />
          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                <RestaurantSidebar />
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div class="user-dashboard loader-holder">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="row">
                        <div class="element-title has-border right-filters-row">
                          <h5>Recent Bookings</h5>
                          <div class="right-filters row pull-right">
                            <div class="col-lg-6 col-md-6 col-xs-6">
                              <div class="input-field">
                                <select class="chosen-select-no-single">
                                  <option selected="selected" value="">
                                    Select Booking Status
                                  </option>
                                  <option value="Processing">Processing</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-xs-6">
                              <div class="input-field">
                                <i class="icon-angle-down"></i>
                                <input
                                  type="text"
                                  data-id="daterange223"
                                  id="daterange"
                                  value=""
                                  placeholder="Select Date Range"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="user-orders-list responsive-table">
                          <ul class="table-generic" id="portfolio">
                            <li>
                              <div class="orders-title">Customer Name</div>
                              <div class="orders-date">Date</div>
                              <div class="orders-type">Status</div>
                              <div class="orders-price">Detail</div>
                            </li>

                            {bookings.map((booking) => (
                              <li key={booking.id}>
                                <div class="orders-title">
                                  <h6 class="order-title">
                                    <a
                                      href="#"
                                      data-toggle="modal"
                                      data-target={`#booking-detail-${booking.id}`}
                                    >
                                      {booking.firstname}
                                    </a>
                                  </h6>
                                </div>
                                <div class="orders-date">
                                  <span>{formatDate(booking.date)}</span>
                                </div>
                                <div class="orders-status">
                                  <span
                                    class="booking-status"
                                    style={{ backgroundColor: "#047a06" }}
                                  >
                                    Completed
                                  </span>
                                </div>
                                <div class="orders-price">
                                  <a
                                    href="#"
                                    data-toggle="modal"
                                    data-target={`#booking-detail-${booking.id}`}
                                  >
                                    <i class="icon-plus2 text-color"></i>
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
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

      {/* Create a modal for each booking */}
      {bookings.map((booking) => (
        <div
          class="modal fade menu-order-detail menu-order-info"
          id={`booking-detail-${booking.id}`}
          tabindex="-1"
          role="dialog"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h2>
                  <a>Booking Detail</a>
                </h2>
              </div>
              <div class="modal-body booking-modal-body">
                <div class="order-detail-inner">
                  <h3>{restaurant.name}</h3>
                  <ul class="order-detail-options">
                    <li>
                      <strong>Booking ID :</strong>
                      <span>{booking.id}</span>
                    </li>
                    <li>
                      <strong>Booking Date :</strong>
                      <span>{formatDate(booking.date)}</span>
                    </li>
                  </ul>
                  <h3>Customer Detail</h3>
                  <ul class="order-detail-options">
                    <li>
                      <strong>First Name:</strong>
                      <span>{booking.firstname}</span>
                    </li>
                    <li>
                      <strong>Last Name:</strong>
                      <span>{booking.lastname}</span>
                    </li>
                    <li>
                      <strong>Email:</strong>
                      <span>{booking.email}</span>
                    </li>
                    <li>
                      <span>{booking.guests}-guest</span>
                    </li>
                    <li>
                      <span>{formatDate(booking.date)} {booking.time}</span>
                    </li>
                    <li class="order-detail-message">
                      <strong>Instructions:</strong>
                      <span>{booking.instruction}</span>
                    </li>
                  </ul>
                  <h3>Booking Status</h3>
                  <div class="booking-status-holder">
                    <div class="input-field">
                      <select class="chosen-select-no-single">
                        <option value="Processing">Processing</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RestaurantBookings;
