import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const ForgotPassword = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState('');
  console.log(email);
  

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Remembered your password?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
