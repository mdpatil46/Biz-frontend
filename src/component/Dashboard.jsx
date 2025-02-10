import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  
  console.log(token,"token chace")


  const fetchUserDetails = async () => {
    try {
    
      const response = await axios.get(`${baseURL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);

console.log(response?.data);

    } catch (error) { 
      navigate('/');
      console.error(error, 'Check error')
    }
  };

  console.log(user, 'user')

  const handleLogout = async() => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/logout`) 
      sessionStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error(error,"ERROR")
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
        <div className="text-center">
        <img
  src={user.profileImage ? `${baseURL}/${user.profileImage.replace(/\\/g, '/')}` : 'default-placeholder-image-url'}
  alt="Profile"
  className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
/>

          <p className="mt-4 text-gray-700">
            <span className="font-medium">First Name:</span> {user.firstName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Last Name:</span> {user.lastName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Gender:</span> {user.gender}
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
