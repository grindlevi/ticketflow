import { useState } from "react";
import { RegisterValidator } from "../classes/validation/RegisterValidator";
import { RegisterFormData } from "../utils/types";
import { RegistrationFetch } from "../classes/fetching/RegistrationFetch";

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [passwordAlert, setPasswodAlert] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Set form data acoording to user input
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

    if (
      !registerValidator.validateUsernameLength() ||
      !registerValidator.checkIfPasswordsMatch() ||
      !registerValidator.checkIfPasswordContainsLowerCaseLetter() ||
      !registerValidator.checkIfPasswordContainsUpperCaseLetter ||
      !registerValidator.checkIfPasswordContainsNumber
    ) {
      setPasswodAlert(!passwordAlert);
      return;
    }

    const registrationFetch = new RegistrationFetch()
    const registrationSuccess = await registrationFetch.registerUser(formData)
    
    // If credentials match the criterias, register the user.
    if (registrationSuccess) {
      console.log("Successful registration");
      onRegisterSuccess()
    } else {
      console.error("Error during registration: ", Error);
      
    }
  };

  return (
    <div className="register">
      <div>
        <p>Register</p>
        <form onSubmit={handleSubmit}>
          {
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
          }
          <div>
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
          {
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div className="passwordAlert">
                {passwordAlert ? <h3 className="register-alert">Your credentials do not match the criterias.</h3> : ""}
                <div className="registration-criterias">
                  <h5>Username must be longer than 6 characters</h5>
                  <h5>Password must contain lowercase letters,</h5>
                  <h5>uppercase letters, and at least a number</h5>
                </div>
              </div>
            </div>
          }
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
