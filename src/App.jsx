import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Nav from './Nav';
import Data from './Data';
import Categories from './Categories';
import Products from './Product';
import Footer from './Footer';
import Login from './Login';
import Cart from './Cart';
import Success from './Success';
import Cancel from './Cancel';
import Profile from './Profile'


// Layout Wrapper to apply conditional layout components
const Layout = ({ children }) => {
  const location = useLocation();
  const showLayout = !['login', 'success', 'cancel'].includes(location.pathname.slice(1));

  return (
    <>
      {showLayout && <Nav />}
      {showLayout && <Data />}
      {children}
      {showLayout && <Footer />}
    </>
  );
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Categories />} />
          <Route path="/products/:category" element ={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} /> {/* Updated to include :orderId */}
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
