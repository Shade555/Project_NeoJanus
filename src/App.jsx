import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Index from "./Index";  // ✅ Single authentication page (Login + Signup)
//import Login from "./Login";  // ❌ REMOVE this if Index.jsx already handles login
import ExDashboard from "./exDashboard";
import Home from "./Home";
import "./Home.css";
import { Canvas } from "@react-three/fiber";
import HolographicEarth from "./HolographicEarth";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />  {/* ✅ Single authentication page */}
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
