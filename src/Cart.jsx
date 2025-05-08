import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QLevyRuIIImsT0YesS2KuNPhbo5pdS38dJkYKWCgwDKwF03wxxtprA7ySg5ICGgBagjSl1q32YWw7c4cfQ2lNPL007PFJqNld');

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetchCartItems();
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleEditAddress = () => {
    const newAddress = prompt('Enter your new address:', address);
    if (newAddress && newAddress.trim() !== '') {
      setAddress(newAddress); // Update the address in state
      alert('Address updated successfully!'); // Optional: Notify the user
    } else {
      alert('Address cannot be empty.'); // Optional: Notify the user
    }
  };
  
  return (
    <div id="cart" className="w-full min-h-screen bg-[#18181b] py-4 px-4 relative z-[9]">
      <h1 className="text-3xl font-semibold mb-6 text-white text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-white text-center">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="bg-[#d1d1d1] shadow-lg rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => (e.target.src = '/fallback.jpg')}
                />
                <div>
                  <h2 className="text-xl font-medium">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="bg-[#d1d1d1] shadow-lg rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Total:</h3>
              <p className="text-xl font-semibold">₹{calculateTotal()}</p>
            </div>
            {address && (
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Shipping Address:</h3>
                <p className="text-md">{address}</p>
                <button
                  onClick={handleEditAddress}
                  className="ml-5 bg-red-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                >
                  Edit Address
                </button>
              </div>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}             >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;