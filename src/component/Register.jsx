import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    profileImage: Yup.mixed().required('Profile Image is required'),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      await axios.post(`${baseURL}/api/auth/register`, formData);
      Swal.fire({
        title: 'Success!',
        text: 'Registered Successfully',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">Create Account</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            profileImage: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {['firstName', 'lastName', 'email', 'password'].map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-400 text-sm mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <Field
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder={`Enter your ${field}`}
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
              <div>
                <label className="block text-gray-400 text-sm mb-1">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Profile Image</label>
                <input
                  type="file"
                  onChange={(event) => setFieldValue('profileImage', event.target.files[0])}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <ErrorMessage name="profileImage" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                Register
              </button>
              <p className="text-gray-400 text-center text-sm mt-4">
                Already have an account? <Link to="/" className="text-indigo-400 hover:underline">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
