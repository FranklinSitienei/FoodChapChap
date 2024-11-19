import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import CustomerHeader from './CustomerHeader';
import './CustomerOrder.css';
import Home from './Home';

function CustomerOrders() {
  const [userr, setUserr] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const location = useLocation();
  const [highlightedOrderId, setHighlightedOrderId] = useState(null); // New state for highlighting

  useEffect(() => {
    // Fetch user data
    const token = localStorage.getItem('user');

    fetch('/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(user => {
        setUserr(user);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []);

  useEffect(() => {
    // Fetch user orders only if user data is available
    if (userr) {
      const token = localStorage.getItem('user');

      fetch('/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(orders => {
          setUserOrders(orders);
          // Highlight the new order if available
          if (location.state?.newOrderId) {
            setHighlightedOrderId(location.state.newOrderId);
          }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [userr, location.state?.newOrderId]);

  const handleConfirmOrder = (orderId) => {
    const token = localStorage.getItem('user');

    fetch(`/orders/${orderId}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(() => {
        setUserOrders(userOrders.map(order =>
          order.id === orderId ? { ...order, status: 'Confirmed' } : order
        ));
      })
      .catch(error => console.error('Error confirming order:', error));
  };

  const handleCancelOrder = (orderId) => {
    const token = localStorage.getItem('user');

    fetch(`/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(() => {
        setUserOrders(userOrders.map(order =>
          order.id === orderId ? { ...order, status: 'Cancelled' } : order
        ));

        // Schedule self-deletion in 5 minutes
        setTimeout(() => {
          fetch(`/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
              if (response.ok) {
                setUserOrders(userOrders.filter(order => order.id !== orderId));
              }
            })
            .catch(error => console.error('Error deleting order:', error));
        }, 5 * 60 * 1000); // 5 minutes
      })
      .catch(error => console.error('Error cancelling order:', error));
  };

  const calculateRemainingTime = (order) => {
    const creationTime = new Date(order.created_at);
    const currentTime = new Date();
    const confirmationDeadline = new Date(creationTime.getTime() + 10 * 60000); // Adding 10 minutes

    if (currentTime < confirmationDeadline) {
      const remainingMilliseconds = confirmationDeadline - currentTime;
      const remainingMinutes = Math.ceil(remainingMilliseconds / 60000);
      return `Confirm within ${remainingMinutes} minutes`;
    } else {
      return "Time expired";
    }
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(userOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {userr && (
        <div className="main-section">
          <CustomerHeader userr={userr} />
          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                <CustomerSidebar />
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="user-dashboard">
                    <div className="user-holder">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="element-title has-border right-filters-row">
                            <h5>My Orders</h5>
                            <div className="right-filters row pull-right">
                              <div className="col-lg-6 col-md-6 col-xs-6">
                                <div className="input-field">
                                  <select className="chosen-select-no-single" style={{ display: "none" }}>
                                    <option selected="selected" value="">Select Orders Status</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                  <div className="chosen-container chosen-container-single chosen-container-single-nosearch" style={{ width: "190px" }} title="">
                                    <a className="chosen-single" tabIndex="-1">
                                      <span>Select Orders Status</span>
                                      <div><b></b></div>
                                    </a>
                                    <div className="chosen-drop">
                                      <div className="chosen-search">
                                        <input type="text" autoComplete="off" readOnly="" />
                                      </div>
                                      <ul className="chosen-results"></ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="user-orders-list">
                            <div className="row">
                              {Array.isArray(currentOrders) && currentOrders.map((order) => (
                                <div key={order.id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className={`order-list ${highlightedOrderId === order.id ? 'highlighted' : ''}`} style={{ height: "272px" }}>
                                    <div className="author-info">
                                      <div className="img-holder">
                                        <figure>
                                          <a href="#"><img src={`../assets/extra-images/${order.restaurant.image}`} alt="#" /></a>
                                        </figure>
                                      </div>
                                      <div className="text-holder">
                                        <h6><a href="listing-detail.html">{order.restaurant.name}</a></h6>
                                        <address>Apple Juice</address>
                                        <span className="price">Ksh {order.price}</span>
                                      </div>
                                    </div>
                                    <div className="post-time">
                                      <span>{calculateRemainingTime(order)}</span>
                                    </div>
                                    <span className="date-time">
                                      {order.created_at} </span>
                                    <div className="order-btn">
                                      <a href="#" data-toggle="modal" data-target={`#order_detail${order.id}`}>Order Detail</a>
                                      <span className="order-status" style={{ backgroundColor: "#1e73be" }}>{order.status || 'Processing'}</span>
                                    </div>
                                    <div className="order-actions">
                                      <button onClick={() => handleConfirmOrder(order.id)} className='confirm'>Confirm</button>
                                      <button onClick={() => handleCancelOrder(order.id)} className='cancel'>Cancel</button>
                                    </div>
                                    <div className="modal fade menu-order-detail order-detail" id={`order_detail${order.id}`} tabIndex="-1" role="dialog">
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                            <h2>Order Detail: {order.id}</h2>
                                          </div>
                                          <div className="modal-body">
                                            <div className="order-detail-inner">
                                              <div className="description-holder">
                                                <div className="row">
                                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className="list-detail-options has-checkbox">
                                                      <h3>{order.restaurant.name}</h3>
                                                      <ul className="order-detail-options">
                                                        <li className="order-number">
                                                          <strong>Order ID:</strong>
                                                          <span>{order.id}</span>
                                                        </li>
                                                        {/* <li className="req-delivery">
                                                          <strong>Delivery Time:</strong>
                                                          <span>10 Minutes </span>
                                                        </li> */}
                                                        <li className="created-date">
                                                          <strong>Order Date</strong>
                                                          <span>{order.created_at} </span>
                                                        </li>
                                                        <li className="order-type">
                                                          <strong>Type:</strong>
                                                          <span>{order.order_type}</span>
                                                        </li>
                                                        <li className="order-type">
                                                          <strong>Payment Status:</strong>
                                                          <span>{order.status === 'created' ? 'Processing' : order.status}</span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className="customer-detail-holder">
                                                      <h3>Customer Detail</h3>
                                                      <ul className="customer-detail">
                                                        <li>
                                                          <strong>Name :</strong>
                                                          <span>{userr.username}</span>
                                                        </li>
                                                        <li>
                                                          <strong>Phone Number :</strong>
                                                          <span>{userr.phone}</span>
                                                        </li>
                                                        <li>
                                                          <strong>Email :</strong>
                                                          <span>{userr.email}</span>
                                                        </li>
                                                        <li>
                                                          <strong>Address :</strong>
                                                          <span>{userr.address}</span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>                                                                                              
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="order-status-holder">
                                                      <div className="order-status-process order-status">
                                                        <p style={{ background: "#1e73be" }}>Your order is Processing </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <h2 className="heading">Food Menu</h2>
                                                    <div className="responsive-table">
                                                      <ul className="categories-order table-generic">
                                                        <li className="order-heading-titles">
                                                          <div>Products</div>
                                                          <div>Quantity</div>
                                                          <div>Total Price</div>
                                                        </li>
                                                        {order.orderitems.map(item => (
                                                          <li key={item.id}>
                                                            <div className="order-dish-name">
                                                              <h4><a href="#">{item.food.name}</a></h4>
                                                            </div>
                                                            <div className="order-dish-quantity">
                                                              <strong>{item.quantity}</strong>
                                                            </div>
                                                            <div className="order-dish-price">
                                                              <strong>Ksh {item.price}</strong>
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
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {userOrders.length > ordersPerPage && (
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="pagination-center">
                              <ul className="pagination">
                                <li onClick={() => handlePageChange(currentPage - 1)} className={`pagination-prev ${currentPage === 1 ? 'disabled' : ''}`}>
                                  <a href="#">Prev</a>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                  <li key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                                    <a href="#">{index + 1}</a>
                                  </li>
                                ))}
                                <li onClick={() => handlePageChange(currentPage + 1)} className={`pagination-next ${currentPage === totalPages ? 'disabled' : ''}`}>
                                  <a href="#">Next</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link to="/" component={Home} />
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

export default CustomerOrders;
