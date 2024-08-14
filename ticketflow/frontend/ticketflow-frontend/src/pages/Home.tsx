import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const Home: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="home">
      <h1>Welcome to Ticketflow!</h1>
      <p>Your one-stop solution for managing tickets efficiently.</p>

      <div>
        {isRegistering ? (
          <Register onRegisterSuccess={switchMode} />
        ) : (
          <Login />
        )}
        <p>
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button onClick={switchMode}>
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Home;
