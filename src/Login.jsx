import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="user-box">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>Password</label>
        </div>
        <button type="submit" className="btn-neon">
          <span></span><span></span><span></span><span></span>
          Login
        </button>
      </form>
      <p style={{ color: "#fff", marginTop: "15px" }}>
        Don't have an account? <Link to="/" style={{ color: "#03e9f4" }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
