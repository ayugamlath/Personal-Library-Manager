import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/library"
            element={
              <PrivateRoute>
                <SavedBooks />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
