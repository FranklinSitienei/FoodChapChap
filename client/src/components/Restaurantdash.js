import React, { useEffect, useState } from 'react';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function Restaurantdash() {
  const [restaurant, setRestaurant] = useState({});
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedRestaurant = JSON.parse(localStorage.getItem("restaurant"));

    if (storedRestaurant) {
      const { token, ...restaurantData } = storedRestaurant;
      setRestaurant(restaurantData);

      // Fetch orders if token is available
      if (token) {
        fetch('https://foodchapchap-qq3a.onrender.com/restaurants/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setOrders(data.orders || []);
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
            setErrorMessage("Error fetching orders");
          });
      } else {
        setErrorMessage("No valid token found.");
      }
    } else {
      setErrorMessage("No restaurant data found.");
    }
  }, []);

  // Redirect to home if no restaurant data or invalid token
  if (errorMessage) {
    window.location.href = "../";
    return null;
  }

  return (
    <>
      {restaurant && (
        <div className="main-section">
          <RestaurantHeader restaurant={restaurant} />
          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                <RestaurantSidebar />
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="user-dashboard loader-holder">
                    <div className="user-holder">
                      <div className="user-message" style={{ height: '110px', display: 'none' }}>
                        <a className="close" href="#"><i className="icon-cross-out"></i></a>
                        <h2>Welcome to your Restaurant.</h2>
                        <p>
                          Restaurant Dashboard gives you quick access to settings and tools for managing your Account like [Change address] and [Change password]. You can [manage Restaurant], Build Menu, Manage Orders, Bookings, Reviews, Memberships, Withdrawals, Earnings, Statements, Change Password, Location, and if you are a Restaurant Owner, you can also [Manage Team].
                        </p>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="element-title has-border right-filters-row">
                            <h5>Recent Orders</h5>
                            <div className="right-filters row pull-right">
                              <div className="col-lg-6 col-md-6 col-xs-6">
                                <div className="input-field">
                                  <select className="chosen-select-no-single">
                                    <option selected="selected" value="">Select Orders Status</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-xs-6">
                                <div className="input-field">
                                  <i className="icon-angle-down"></i>
                                  <input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="user-orders-list">
                            <div className="responsive-table">
                              <ul className="table-generic">
                                <li className="order-heading-titles">
                                  <div>Order id</div>
                                  <div>Date</div>
                                  <div>Total Price</div>
                                  <div>Status</div>
                                  <div>Detail</div>
                                </li>

                                {Array.isArray(orders) && orders.map((order, index) => (
                                  <React.Fragment key={index}>
                                    <li className="order-heading-titles">
                                      <div><a href="#" data-toggle="modal" data-target={`#order-det-${order.order_id}`}>order-{order.order_id}</a></div>
                                      <div>{order.created_at}</div>
                                      <div>ksh {order.order_price}</div>
                                      <div><span className="order-status" style={{ backgroundColor: '#047a06' }}>Completed</span></div>
                                      <div><a href="#" data-toggle="modal" data-target={`#order-det-${order.order_id}`}><i className="icon-plus2 text-color"></i></a></div>
                                    </li>
                                    <div className="modal fade menu-order-detail order-detail" id={`order-det-${order.order_id}`} tabIndex="-1" role="dialog" style={{ display: 'none' }}>
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                            <h2>Order Detail</h2>
                                            <button className="btn-print"><i className="icon-printer"></i><span>Receipt</span></button>
                                          </div>
                                          <div className="modal-body">
                                            <div className="order-detail-inner">
                                              <div className="description-holder">
                                                <div className="row">
                                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className="list-detail-options has-checkbox">
                                                      <h3>{restaurant.name}</h3>
                                                      <ul className="order-detail-options">
                                                        <li className="order-number">
                                                          <strong>Order ID:</strong>
                                                          <span>{order.order_id}</span>
                                                        </li>
                                                        <li className="req-delivery">
                                                          <strong>Delivery Time:</strong>
                                                          <span>10 Minutes</span>
                                                        </li>
                                                        <li className="created-date">
                                                          <strong>Delivery Date:</strong>
                                                          <span>{order.created_at}</span>
                                                        </li>
                                                        <li className="order-type">
                                                          <strong>Type:</strong>
                                                          <span>{order.order_type}</span>
                                                        </li>
                                                        <li className="order-type">
                                                          <strong>Payment Status:</strong>
                                                          <span>{order.payment_status}</span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className="customer-detail-holder">
                                                      <h3>Customer Detail</h3>
                                                      <ul className="customer-detail">
                                                        <li>
                                                          <strong>Name:</strong>
                                                          <span>{order.user.username}</span>
                                                        </li>
                                                        <li>
                                                          <strong>Phone Number:</strong>
                                                          <span>{order.user.phone_number}</span>
                                                        </li>
                                                        <li>
                                                          <strong>Location:</strong>
                                                          <span>{order.user.location}</span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="order-status-holder">
                                                      <div className="row">
                                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                                          <h3>Order Status</h3>
                                                        </div>
                                                        <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                                                          <div className="input-field">
                                                            <select className="chosen-select-no-single">
                                                              <option value="Processing">Processing</option>
                                                              <option value="Cancelled">Cancelled</option>
                                                              <option selected="selected" value="Completed">Completed</option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <h2 className="heading">Food Menu</h2>
                                                    <div className="responsive-table">
                                                      <ul className="categories-order table-generic">
                                                        <li className="order-heading-titles">
                                                          <div>Products</div>
                                                          <div>Price per</div>
                                                        </li>
                                                        {order.orderitems && order.orderitems.map((item, itemIndex) => (
                                                          <li key={itemIndex}>
                                                            <div>{item.item_name}</div>
                                                            <div>{item.item_price}</div>
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
                                  </React.Fragment>
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
          </div>
        </div>
      )}
    </>
  );
}

export default Restaurantdash;
