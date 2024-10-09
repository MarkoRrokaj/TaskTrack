import "./LoginForm.css";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; // Updated to ensure correct import for React Router
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // Ensure to use the navigate function from useNavigate
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5173/login", {
        email,
        password,
      });
      if (result.data === "Success") {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={email} // Assuming username is actually the email
            onChange={(e) => setEmail(e.target.value)} // Capture input for email
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Capture input for password
          />
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="./register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
