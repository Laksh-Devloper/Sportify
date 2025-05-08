import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.fullName);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/login");
  };

  const handlestore = () => {
    navigate("/");
  };

  return (
    <nav className="bg-black bg-opacity-50 fixed top-0 w-full z-10">
      <div className="flex justify-between items-center p-4">
        <div className="navbar-logo text-white">
          <h2 className="text-xl font-bold">SPORTIFY</h2>
        </div>
        <div className="navbar-links flex items-center space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#about" className="text-white hover:text-gray-300">
            About
          </a>
          <a
            href="#store"
            onClick={handlestore}
            className="text-white hover:text-gray-300"
          >
            Store
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>

          {userName ? (
            <div className="flex items-center space-x-4">
              <a
                href="#cart"
                onClick={() => navigate("/cart")}
                className="text-white hover:text-gray-300"
              >
                <img
                  src="/shopping-cart.png"
                  alt="Cart Icon"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="#profile"
                onClick={() => navigate("/profile")}
                className="text-white hover:text-gray-300"
              >
                <img
                  src="/profile.png"
                  alt="Profile Icon"
                  className="w-8 h-8"
                />
              </a>
              <button
                className="login-btn text-white hover:text-white-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="login-btn text-white hover:text-gray-300"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
