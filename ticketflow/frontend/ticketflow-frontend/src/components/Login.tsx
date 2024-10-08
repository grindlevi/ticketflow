import { useState } from "react";
import { LoginResponse } from "../utils/types";
import { useNavigate } from "react-router-dom";

import '../css/login.css'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: Response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful.");
        const data: LoginResponse = await response.json()
        localStorage.setItem("jwt", data.jwt)
        localStorage.setItem("username", data.username)
        localStorage.setItem("roles", JSON.stringify(data.roles))

        navigate('/dashboard')
      } else {
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
    
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-main-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-input-username">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="login-input-password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="login-submit-button">Login</button>
      </form>
    </div>
  ); 
}

export default Login