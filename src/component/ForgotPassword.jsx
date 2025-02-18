import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/auth/forgot-password`, { email });
      Swal.fire("Password reset link sent to your email");
    } catch (error) {
      Swal.fire("Error sending email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-gray-400 text-center text-sm mt-4">
          Remembered your password?{' '}
          <Link to="/" className="text-indigo-400 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
