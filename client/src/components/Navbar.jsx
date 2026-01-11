import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyLibrary
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500">
            Search
          </Link>
          {user ? (
            <>
              <Link to="/library" className="text-gray-600 hover:text-blue-500">
                My Library
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-500">
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
