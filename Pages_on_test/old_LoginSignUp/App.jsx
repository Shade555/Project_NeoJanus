import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Signup from "./Signup";  
import Login from "./Login";    
import ExDashboard from "./exDashboard"; 
import Home from "./Home";
import "./Home.css";
import { Canvas } from "@react-three/fiber"; // ✅ Import Canvas for 3D components
import HolographicEarth from "./HolographicEarth"; // ✅ Import your 3D Earth component

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><ExDashboard /></ProtectedRoute>} />
        <Route path="/home" element={<Home />} />
        <Route 
          path="/holographic-earth" 
          element={
            <Canvas>
              <HolographicEarth />
            </Canvas>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
