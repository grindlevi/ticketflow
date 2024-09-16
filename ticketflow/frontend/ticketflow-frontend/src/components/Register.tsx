import React, { useState } from "react";
import useRegistration from "../hooks/useRegistration";
import { RegisterFormData } from "../utils/types";

import "../css/register.css";

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [inputType, setInputType] = useState<string>("password");
  const [icon, setIcon] = useState<string>("👁️‍🗨️");
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { handleSubmit, passwordAlert } = useRegistration(onRegisterSuccess);

  const togglePasswordVisibility = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
    setIcon((prev) => (prev === "👁️‍🗨️" ? "❌" : "👁️‍🗨️"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="main">
      <h3 className="register-headline">Register</h3>
      <div className="register">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-password-container">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={inputType}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span className="icon-span" onClick={togglePasswordVisibility}>
                <h5 className="icon">{icon}</h5>
              </span>
            </div>
          </div>
          <div className="input-confirm-password-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={inputType}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="passwordAlert"></div>
          {passwordAlert && (
            <h3 className="register-alert">
              Your credentials do not match the criteria.
            </h3>
          )}
          <div className="registration-criterias">
            <h5>Username must be longer than 6 characters</h5>
            <h5>Password must contain lowercase letters,</h5>
            <h5>uppercase letters, and at least a number</h5>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
