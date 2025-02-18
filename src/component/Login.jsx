import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Login = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseURL}/api/auth/login`, values);
        sessionStorage.setItem("token", response.data.token);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials!",
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-5 py-3 mt-2 rounded-xl text-gray-800 focus:outline-none transition-all duration-300 ${
                formik.touched.email && formik.errors.email
                  ? "border-2 border-red-500"
                  : "focus:ring-4 focus:ring-purple-400"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-400">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-5 py-3 mt-2 rounded-xl text-gray-800 focus:outline-none transition-all duration-300 ${
                formik.touched.password && formik.errors.password
                  ? "border-2 border-red-500"
                  : "focus:ring-4 focus:ring-purple-400"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-purple-600 rounded-xl shadow-md hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
          >
            Login
          </motion.button>
        </form>

        {/* Links */}
        <p className="mt-6 text-center text-white text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="font-bold hover:underline">
            Sign up
          </Link>{" "}
          /{" "}
          <Link to="/forgot-password" className="font-bold hover:underline">
            Forgot Password
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
