import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import server from "../environment";
import { useNavigate } from "react-router-dom";
// import { Cookie } from "@mui/icons-material";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token and fetch user data
      axios
        .get(`${server}/api/v1/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          setLoading(false); // Stop loading once user data is fetched
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false); // Stop loading even if there's an error
        });
    } else {
      setLoading(false); // Stop loading if no token is found
    }
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        // console.log("localStorage", token, user);

        if (user && token) {
          localStorage.setItem("token", token); // <-- Bas yeh change karo
          setUser(user);
          alert(`Welcome ${user.first_name || "User"} to Blog Creation...`);
          router("/home");
          return response.data;
        } else {
          alert("Login successful, but user data is missing!");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data?.message) {
        alert(`Login error: ${error.response.data.message}`);
      } else {
        alert("Login error: An unexpected error occurred.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router("/login");
  };

  if (loading) {
    // Show a loading spinner or placeholder while user data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
