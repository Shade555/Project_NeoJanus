import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Signup from "./Signup";  // ✅ No "pages/" folder, so use "./"
import Login from "./Login";    // ✅ No "pages/" folder, so use "./"
import ExDashboard from "./exDashboard"; // ✅ Capitalized component name

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
        <Route path="/dashboard" element={<ProtectedRoute><ExDashboard /></ProtectedRoute>} /> {/* ✅ Fixed component name */}
      </Routes>
    </Router>
  );
}

export default App;
