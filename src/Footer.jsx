import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#18181b] text-white py-6 relative z-[2]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">SPORTIFY</h2>
            <p className="text-sm text-gray-400 mt-2">
              © 2024 SPORTIFY. All Rights Reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="/" className="hover:text-blue-400">Home</a>
            <a href="#about" className="hover:text-blue-400">About</a>
            <a href="#store" className="hover:text-blue-400">Store</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400">Follow us on:</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/insta.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
