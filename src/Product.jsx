import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QLevyRuIIImsT0YesS2KuNPhbo5pdS38dJkYKWCgwDKwF03wxxtprA7ySg5ICGgBagjSl1q32YWw7c4cfQ2lNPL007PFJqNld');

const productsByCategory = {
  football: [
    { name: 'Football Shoes', price: 3000, img: '/football-shoes.jpg' },
    { name: 'Football jersey', price: 1500, img: '/fg3.jpeg' },
    { name: 'Goalkeepers Gloves', price: 800, img: '/fg1.jpeg' },
    { name: 'Premium Football Legs Guard', price: 450, img: '/fg2.jpeg' },
  ],
cricket: [{ name: 'Cricket Bat', price: 5000, img: '/cricket-bat.jpeg' },
    { name: 'cricket ball', price: 1500, img: '/cc2.jpeg' },
    { name: 'Batsman’s Gloves ', price: 800, img: '/cc1.jpeg' },
    { name: 'Premium cricket stumps', price: 450, img: '/cc3.jpeg' },
  ],
hockey: [{ name: 'Hockey Stick', price: 2000, img: '/hockey-stick.jpeg' },
    { name: 'Hockey ball', price: 500, img: '/h1.jpeg' },
    { name: 'Goalkeeper’s helmet ', price: 800, img: '/h2.jpeg' },
    { name: 'Hockey shoes', price: 1250, img: '/h3.jpeg' },
  ],
tennis: [{ name: 'Tennis Racket', price: 1500, img: '/tennis-racket.jpeg' },
    { name: 'Tennis ball', price: 200, img: '/lt1.jpeg' },
    { name: 'Tennis net ', price: 800, img: '/lt2.jpeg' },
    { name: 'Tennis Racket Cover', price: 450, img: '/lt3.jpeg' },
  ],
basketball: [{ name: 'Basketball', price: 1200, img: '/basketball.jpeg' },
    { name: ' Basketball shoes', price: 1800, img: '/bb3.jpeg' },
    { name: ' Basketball net', price: 300, img: '/bb1.jpeg' },
    { name: ' Basketball jersey', price: 1050, img: '/bb2.jpeg' },
  ],
baseball: [{ name: 'Baseball Glove', price: 2500, img: '/baseball-glove.jpeg' },
    { name: 'Baseball Bat', price: 3500, img: '/baseb1.jpeg' },
    { name: 'Baseball Helmet', price: 1000, img: '/baseb3.jpeg' },
    { name:  'Baseball Ball', price: 450, img: '/baseb2.jpeg' },
  ],
badminton: [{ name: 'Badminton Shuttlecock', price: 300, img: '/shuttlecock.jpeg' },
    { name: 'Badminton Shoes', price: 1500, img: '/bm2.jpeg' },
    { name: 'Badminton Racket cover', price: 400, img: '/bm3.jpeg' },
    { name:  'Badminton Racket', price: 1450, img: '/bm1.jpeg' },
  ],
table_tennis: [{ name: 'Table Tennis Paddle', price: 800, img: '/tt-paddle.jpeg' },
    { name: 'Table Tennis Table', price: 5500, img: '/tt3.jpeg' },
    { name: 'Table Tennis Ball', price: 100, img: '/tt1.jpeg' },
    { name:  'Table Tennis Net', price: 250, img: '/tt2.jpeg' },
  ],
golf: [{ name: 'Golf Club', price: 7000, img: '/golf-club.jpeg' },
    { name: 'Golf Ball', price: 500, img: '/g1.jpeg' },
    { name: 'Golf kit bag', price: 2800, img: '/g2.jpeg' },
    { name:  'Golf Field Holecutter', price: 4450, img: '/g3.jpeg' },
  ],
rugby: [{ name: 'Rugby Ball', price: 1800, img: '/rugby-ball.jpeg' },
    { name: 'Rugby Helmet', price: 700, img: '/rb1.jpeg' },
    { name: 'Rugby chest gaurd', price: 1800, img: '/rb2.jpeg' },
    { name:  'Rugby mouth guard', price: 450, img: '/rb3.jpeg' },
  ],
archery: [{ name: 'Bow and Arrow', price: 5000, img: '/bow-arrow.jpeg' },
    { name: 'Target', price: 1500, img: '/aa1.jpeg' },
    { name: 'quiver', price: 800, img: '/aa2.jpeg' },
    { name:  'arm guard', price: 450, img: '/aa3.jpeg' },
  ],
ice_hockey: [{ name: 'Ice Hockey Stick', price: 4000, img: '/ice-hockey-stick.jpeg' },
    { name: 'Ice Hockey Ball', price: 500, img: '/ih1.jpeg' },
    { name: 'Ice Hockey Gloves', price: 1800, img: '/ih2.jpeg' },
    { name:  'Ice Hockey Shoes', price: 5450, img: '/ih3.jpeg' },
  ],
};

const Products = () => {
  const { category } = useParams();
  const products = productsByCategory[category] || [];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBuyNow = async (product) => {
    if (!isLoggedIn) {
      alert('Please log in to make a purchase');
      return;
    }

    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment session creation failed');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment processing failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: `${category}-${product.name}`,
          name: product.name,
          price: product.price,
          img: product.img
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Add to Cart Error:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const formatCategory = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');

  return (
    <div className="min-h-screen p-6 bg-[#18181b] relative z-10">
      <h1 className="text-3xl font-bold text-center text-white mb-8 z-10">
        {formatCategory(category)} Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
  key={index}
  className="bg-[#313131] rounded-lg overflow-hidden relative group"
>
  <div className="relative overflow-hidden">
    <img
      src={product.img}
      alt={product.name}
      className="w-full h-48 object-cover transform group-hover:scale-110 group-hover:translate-y-[-10px] transition duration-300"
      onError={(e) => (e.target.src = '/fallback.jpg')}
    />
  </div>
  <div className="p-4">
    <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>
    <p className="text-lg text-white mb-4">₹{product.price}</p>
    <div className="flex gap-2">
      <button
        onClick={() => handleBuyNow(product)}
        disabled={loading}
        className={`bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Buy Now'}
      </button>
      <button
        onClick={() => handleAddToCart(product)}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-white"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default Products;
