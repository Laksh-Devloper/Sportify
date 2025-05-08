import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchOrders();
    }
  }, [userData]);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not logged in.');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Only update userData if it's not already in the state
      if (!userData || userData.email !== response.data.email) {
        setUserData(response.data);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data.');
    }
  };
  
  
  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token || !userData?.email) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/orders?email=${userData.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  return (
    <div id="profile" className="profile-container relative z-[9]">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="profile-card">
          {userData && (
            <>
              <h1>Welcome User {userData.name}</h1>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Address:</strong> {userData.address || 'Not Provided'}</p>
            </>
          )}
          <h1>Your Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order._id}>
                  <h3>Order ID: {order._id}</h3>
                  <ul>
                    {order.products.map((product, index) => (
                      <li key={index}>
                        <p>{product.name}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
