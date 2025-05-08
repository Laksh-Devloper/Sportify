import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#18181b] flex items-center justify-center p-6">
      <div className="bg-[#313131] p-8 rounded-lg max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Payment Cancelled</h2>
        <p className="text-gray-300 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Return Home
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
