import React, { useEffect, useState } from 'react';
import RiderHeader from './RiderHeader';
import RiderSidebar from './RiderSidebar';
import { useNavigate } from 'react-router-dom';

function RiderDash() {
  const [riderData, setRiderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRiderData = async () => {
      try {
        const token = localStorage.getItem('rider_token');
        if (!token) {
          console.log('No token found, redirecting to login.');
          navigate('/riderlogin');
          return;
        }

        console.log('Token found:', token);
        const response = await fetch("https://foodchapchap-qq3a.onrender.com/riders/me", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.log('Unauthorized, redirecting to login.');
          navigate('/riderlogin');
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch rider data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Rider data fetched:', data);
        setRiderData(data);
      } catch (error) {
        console.error('Error fetching rider data:', error);
      }
    };

    fetchRiderData();
  }, [navigate]);

  const confirmDelivery = async (orderId) => {
    try {
      const token = localStorage.getItem('rider_token');
      if (!token) {
        console.log('No token found, redirecting to login.');
        navigate('/riderlogin');
        return;
      }

      const response = await fetch(`https://foodchapchap-qq3a.onrender.com/orders/${orderId}/confirm_delivery`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedOrders = riderData.orders.filter(order => order.order_id !== orderId);
        setRiderData(prevState => ({
          ...prevState,
          orders: updatedOrders,
        }));
        console.log(`Order #${orderId} confirmed for delivery.`);
      } else {
        throw new Error('Failed to confirm delivery');
      }
    } catch (error) {
      console.error('Error confirming delivery:', error);
    }
  };

  return (
    <div className="main-section">
      {riderData && (
        <>
          <RiderHeader rider={riderData.rider} />
          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                <RiderSidebar />
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="user-dashboard">
                    <div className="user-holder">
                      <div id="close-me" className="user-message" style={{ backgroundColor: '#1e73be' }}>
                        <a className="close close-div" href="#"><i className="icon-cross-out"></i></a>
                        <h2>Welcome to your account</h2>
                        <p>Manage your account, orders, and settings.</p>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="user-suggest-list listing simple">
                            <div className="element-title">
                              <h5>My Current Orders</h5>
                            </div>
                            {riderData.orders && riderData.orders.length > 0 ? (
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Order ID</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>User</th>
                                    <th>Location</th>
                                    <th>Phone</th>
                                    <th>Restaurant</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {riderData.orders.map(order => (
                                    <tr key={order.order_id}>
                                      <td>{order.order_id}</td>
                                      <td>${order.order_price}</td>
                                      <td>{order.order_quantity}</td>
                                      <td>{order.user.username}</td>
                                      <td>{order.user.location}</td>
                                      <td>{order.user.phone_number}</td>
                                      <td>{order.restaurant.name}</td>
                                      <td>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => confirmDelivery(order.order_id)}
                                        >
                                          Confirm Delivery
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p>No orders available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RiderDash;
