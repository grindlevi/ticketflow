import { useNavigate } from "react-router-dom"
import "../css/sign-out-button.css"

const SignOutButton: React.FC = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("jwt")
    localStorage.removeItem("roles")

    navigate("/")
  }

  return (
    <div className="sign-out-button-container">
      <span className="sign-out-tooltip-text">Sign out</span>
      <button className="sign-out" onClick={handleSignOut}>🚀</button>
    </div>
  )
}

export default SignOutButton