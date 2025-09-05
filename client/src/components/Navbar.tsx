import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-lg">
      <h1 className="text-xl font-bold text-green-400">Advanced Calc</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/calculator" className="hover:text-green-400">Calculator</Link>
            <Link to="/history" className="hover:text-green-400">History</Link>
            <Link to="/favorites" className="hover:text-green-400">Favorites</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400">Login</Link>
            <Link to="/register" className="hover:text-green-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
