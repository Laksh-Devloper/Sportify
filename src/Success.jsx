import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#18181b] flex items-center justify-center p-6">
      <div className="bg-[#313131] p-8 rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Success!</h2>
        <p className="text-gray-300 mb-6">
          Your payment was successful. Thank you for your purchase!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Success;