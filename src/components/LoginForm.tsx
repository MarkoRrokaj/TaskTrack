import "./LoginForm.css";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios, { AxiosResponse } from "axios"; // Corrected import

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const result: AxiosResponse = await axios.post(
        "http://localhost:3001/login",
        {
          email,
          password,
        }
      );

      // Handle different status codes
      switch (result.status) {
        case 200:
          console.log(`${email} - Logged in`);
          navigate("/home"); // Success - navigate to home
          break;
        case 401:
          console.error(result.data.message); // Incorrect password
          break;
        case 404:
          console.error(result.data.message); // No record found
          break;
        default:
          console.error("Unexpected response:", result.data.message); // Handle unexpected responses
      }
    } catch (err: any) {
      // Handle error if request fails (like server errors)
      if (err.response) {
        console.error(
          "Server error:",
          err.response.data.message || err.response.statusText
        );
      } else {
        console.error("Request error:", err.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
