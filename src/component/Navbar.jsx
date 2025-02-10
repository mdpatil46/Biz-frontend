import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const Navbar = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const handleLogout = async() => {
        console.log("test");
        
        try {
          const response = await axios.post(`${baseURL}/api/auth/logout`) 
          sessionStorage.removeItem('token');
          navigate('/');
             Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout Successfully",
                    showConfirmButton: false,
                    timer: 1000
                  });
        } catch (error) {
          console.error(error,"ERROR")
        }
      };
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Logo</h1>
        <ul className="flex space-x-4">
        
          <li>
          
            <button
            onClick={handleLogout}
            className=" px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
           
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
