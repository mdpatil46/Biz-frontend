import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Login = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseURL}/api/auth/login`, values);
        sessionStorage.setItem('token', response.data.token);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1000,
        });
        navigate('/dashboard');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid credentials!',
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-md">
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>{' '}/{' '}
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forget password</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
