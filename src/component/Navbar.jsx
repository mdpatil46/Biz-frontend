import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { User, ChevronDown, LogOut } from "lucide-react"; 

const Navbar = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
    const [user, setUser] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

  const handleLogout = async () => {
    console.log("Logging out...");
    
    try {
      await axios.post(`${baseURL}/api/auth/logout`);
      sessionStorage.removeItem("token");
      navigate("/");
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout Successfully",
        showConfirmButton: false, 
        timer: 1000,
      });
    } catch (error) {
      console.error(error, "ERROR");
    }
  };

  console.log(user, "Check")


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
    <nav className="bg-slate-200 text-white py-3 shadow-xl rounded-2xl">
      <div className="container mx-auto flex justify-between items-center px-3">
        
        <h1 className="text-xl font-bold text-gray-600">Logo</h1>

        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
          >
            <User className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700 font-semibold">{user?.firstName}{' '}{user.lastName}</span>
            <ChevronDown className="w-5 h-5 text-gray-700" />
          </button>

          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 w-full text-red-500 hover:bg-gray-100 transition"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
