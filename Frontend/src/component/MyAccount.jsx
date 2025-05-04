import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from "../environment";

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${server}/api/v1/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.response);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch user data");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:4000/api/v1/user/profile",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Profile updated successfully") {
        alert("Profile updated successfully!");
        fetchUserData(); // Refresh user data
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">My Account</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Leave blank to keep current password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
