import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../environment";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

    // Client-side validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.username ||
      !formData.dob ||
      !formData.phoneNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Server", server);

    try {
      const response = await axios.post(
        `${server}/api/v1/user/createUser`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Registration error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setStep(2)}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Contact Number"
                required
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
              <button type="button" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit">Submit</button>
            </>
          )}
        </form>
        <p>
          Already have an account?{" "}
          <button onClick={() => navigate("/login")}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
