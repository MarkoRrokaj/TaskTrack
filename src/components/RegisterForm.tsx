import "./LoginForm.css";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [Username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/register", {
        email,
        password,
      });

      if (result.data.message === "User registered successfully") {
        console.error("User registered successfully!");
        navigate("/login"); // Redirect to login page after successful registration
      } else if (result.data.message === "User already exists") {
        console.error("User already exists, please login.");
      } else {
        console.error("Unexpected error: ", result.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error: ", err.response?.data || err.message);
      } else {
        console.error("Unexpected error: ", err);
      }
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegistration}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
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

        <button type="submit">Register</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="./register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
