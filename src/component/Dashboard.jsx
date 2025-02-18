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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">User Profile</h2>
        <div className="text-center">
          <img
            src={
              user.profileImage
                ? `${baseURL}/${user.profileImage.replace(/\\/g, "/")}`
                : "default-placeholder-image-url"
            }
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

      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Logged in at 10:30 AM</li>
          <li>Updated profile details</li>
          <li>Changed password</li>
        </ul>
      </div>

      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
