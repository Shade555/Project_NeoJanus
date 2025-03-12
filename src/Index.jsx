import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Index.module.css"; // Import your CSS module
import "./styles.css"; // Import global styles

const Index = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Override global background when Index.jsx is loaded
  useEffect(() => {
    document.body.style.background = "#cbd9e6"; // Set white background

    return () => {
      document.body.style.background = ""; // Restore original background on unmount
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      if (isActive) {
        // Sign Up logic
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
        navigate("/dashboard");
      } else {
        // Sign In logic
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`${styles.authContainer} ${isActive ? styles.active : ""}`} id="container">
      {/* Sign Up Form */}
      <div className={`${styles.formContainer} ${styles.signUp}`}>
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <span>Use your email for registration</span>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`${styles.formContainer} ${styles.signIn}`}>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <span>Use your email and password</span>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {error && <p className={styles.error}>{error}</p>}
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={() => setIsActive(false)}>
              Sign In
            </button>
          </div>
          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={() => setIsActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
