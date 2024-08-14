import { useState } from "react";

interface RegisterProps {
  onRegisterSuccess: () => void
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response: Response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration was succesful.");
        onRegisterSuccess()
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    } finally {
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
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
            </div>
          }
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
