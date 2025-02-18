import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      navigate("/");
      console.error(error, "Check error");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Profile</h2>
        <div className="text-center">
          <img
            src={
              user.profileImage
                ? `${baseURL}/${user.profileImage.replace(/\\/g, "/")}`
                : "default-placeholder-image-url"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500"
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
      <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activities</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Logged in at 10:30 AM</li>
          <li>Updated profile details</li>
          <li>Changed password</li>
        </ul>
      </div>

 

    
      <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Statistics</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Total Posts</p>
            <p className="font-semibold text-indigo-600">120</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Followers</p>
            <p className="font-semibold text-indigo-600">1,200</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Following</p>
            <p className="font-semibold text-indigo-600">350</p>
          </div>
        </div>
      </div>

      
      <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <p className="text-gray-700">New comment on your post.</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <p className="text-gray-700">New follower: John Doe</p>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
