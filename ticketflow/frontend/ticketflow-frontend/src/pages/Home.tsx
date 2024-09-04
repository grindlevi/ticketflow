import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

import "../css/home.css";

const Home: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="home">
      <h1 className="home-headline">Welcome to Ticketflow!</h1>
      <h3 className="home-description">
        Your one-stop solution for managing tickets efficiently.
      </h3>

      <div className="home-button-container">
        {isRegistering ? (
          <Register onRegisterSuccess={switchMode} />
        ) : (
          <Login />
        )}
        <div className="home-register-button-container">
          <h1>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
          </h1>
            <button onClick={switchMode} className="home-login/register-button">
              {isRegistering ? "Login here" : "Register here"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
