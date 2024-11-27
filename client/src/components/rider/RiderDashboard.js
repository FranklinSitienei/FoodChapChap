import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import './riderdash.css';

function RiderDashboard() {
  const [orders, setOrders] = useState([]);
  const [rider, setRider] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const fetchRider = async () => {
    try {
      // Fetch login data from localStorage
      const storedLogin = localStorage.getItem('rider_token');
      if (storedLogin) {
        const loginData = JSON.parse(storedLogin);
        // Assuming your login data includes the rider's email
        const response = await axios.get(`https://foodchapchap-qq3a.onrender.com/ridersme/${loginData.email}`);
        setRider(response.data);
        fetchDeliveries();
      } else {
        console.error('Login data not found in localStorage');
      }
    } catch (error) {
      console.error(`Error fetching rider details: ${error}`);
    }
  };

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('https://foodchapchap-qq3a.onrender.com/orders/deliveries');
      setOrders(response.data);
    } catch (error) {
      console.error(`Error fetching deliveries: ${error}`);
    }
  };

  const confirmDelivery = async (orderId) => {
    try {
      await axios.patch(`https://foodchapchap-qq3a.onrender.com/orders/${orderId}/confirm_delivery`);
      fetchDeliveries();
    } catch (error) {
      console.error(`Error confirming delivery: ${error}`);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`https://foodchapchap-qq3a.onrender.com/users/${userId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error(`Error fetching user details: ${error}`);
    }
  };

  useEffect(() => {
    fetchRider();
  }, []);

  return (
    <Layout>
      <div className="rider-dashboard-content">
        <h1>Welcome, {rider?.first_name}</h1>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Order Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.username}</td>
                <td>{order.phone_number}</td>
                <td>{order.address}</td>
                <td>{order.order_type}</td>
                <td>
                  <button onClick={() => confirmDelivery(order.id)}>Confirm Delivery</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default RiderDashboard;
