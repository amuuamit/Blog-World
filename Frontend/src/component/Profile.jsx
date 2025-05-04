import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import server from "../environment";

const Profile = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from AuthContext
  console.log("User", user);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    about: "",
    email: "",
    password: "",
    username: "",
    role: "USER",
    dob: "",
    phoneNumber: "",
    communication_address: {
      address_1: "",
      address_2: "",
      country: "INDIA",
      state: "",
    },
  });

  // Populate formData with user data from AuthContext when the component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        about: user.about || "",
        email: user.email || "",
        password: "", // Leave password empty for security reasons
        username: user.username || "",
        role: user.role || "USER",
        dob: user.dob || "",
        phoneNumber: user.phoneNumber || "",
        communication_address: {
          address_1: user.communication_address?.address_1 || "",
          address_2: user.communication_address?.address_2 || "",
          country: user.communication_address?.country || "INDIA",
          state: user.communication_address?.state || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      communication_address: {
        ...formData.communication_address,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${server}/api/v1/user/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token", token);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Contact Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address_1"
            placeholder="Address 1"
            value={formData.communication_address.address_1}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="address_2"
            placeholder="Address 2"
            value={formData.communication_address.address_2}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.communication_address.state}
            onChange={handleAddressChange}
          />
          <select
            name="role"
            className="select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="TESTER">TESTER</option>
          </select>
          <select
            name="country"
            value={formData.communication_address.country}
            onChange={handleAddressChange}
          >
            <option value="INDIA">INDIA</option>
            <option value="USA">USA</option>
            <option value="AUSTRALIA">AUSTRALIA</option>
          </select>
          <textarea
            name="about"
            placeholder="Something About Yourself"
            value={formData.about}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
