import { useState } from "react";
import { RegisterValidator } from "../classes/validation/RegisterValidator";
import { RegisterFormData } from "../utils/types";
import { RegistrationFetch } from "../classes/fetching/RegistrationFetch";

import "../css/register.css";

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [inputType, setInputType] = useState<string>("password");
  const [icon, setIcon] = useState<string>("👁️‍🗨️");
  const [passwordAlert, setPasswordAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
      setIcon("❌");
    } else {
      setInputType("password");
      setIcon("👁️‍🗨️");
    }
  };

  // Set form data according to user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit event
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent page reloading
    e.preventDefault();

    // Validating register credentials
    const registerValidator = new RegisterValidator(formData);

    // Perform validations
    const usernameLengthValid = registerValidator.validateUsernameLength();
    const passwordsMatch = registerValidator.checkIfPasswordsMatch();
    const containsLowercase = registerValidator.checkIfPasswordContainsLowerCaseLetter();
    const containsUppercase = registerValidator.checkIfPasswordContainsUpperCaseLetter();
    const containsNumber = registerValidator.checkIfPasswordContainsNumber();

    if (
      !usernameLengthValid ||
      !passwordsMatch ||
      !containsLowercase ||
      !containsUppercase ||
      !containsNumber
    ) {
      setPasswordAlert(true);
      return;
    }

    const registrationFetch = new RegistrationFetch();
    const registrationSuccess = await registrationFetch.registerUser(formData);

    // If credentials match the criterias, register the user.
    if (registrationSuccess) {
      console.log("Successful registration");
      onRegisterSuccess();
    } else {
      console.error("Error during registration");
    }
  };

  return (
    <div className="main">
      <h3 className="register-headline">Register</h3>
      <div className="register">
        <form onSubmit={handleSubmit}>
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
          {passwordAlert ? (
            <h3 className="register-alert">
              Your credentials do not match the criterias.
            </h3>
          ) : (
            ""
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
