import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
          Sign Up
        </button>
      </form>
      <p style={{ color: "#fff", marginTop: "15px" }}>
        Already have an account? <Link to="/login" style={{ color: "#03e9f4" }}>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
