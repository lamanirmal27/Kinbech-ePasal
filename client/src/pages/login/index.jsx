import "./styles.css";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="login-container">
      <form className="form">
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="text" placeholder="Enter username" />
          <span></span>
        </div>
        <div className="input-container">
          <input type="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <Link to="/register">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
