import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const Navbar = () => {
  const { user = {} } = useAppContext();
  const navigate = useNavigate();

  const { isAuthenticated } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      SuccessToast("Logout successful!");
      window.location.reload();
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  const handleOpenProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div className="p-4 flex items-center justify-between bg-amber-100 border-b border-amber-200 shadow-sm">
      <div className="text-2xl font-bold text-amber-800">
        <Link to={"/"}>Car Rentals</Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-amber-700 hover:text-amber-900 transition-colors duration-200"
        >
          Home
        </Link>

        {!isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="px-3 py-1 rounded-md text-amber-700 hover:bg-amber-200 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-md text-amber-700 hover:bg-amber-200 transition-colors duration-200"
            >
              Logout
            </button>
            <div
              onClick={handleOpenProfilePage}
              className="h-10 w-10 rounded-full bg-amber-700 text-amber-50 text-xl flex items-center justify-center cursor-pointer hover:bg-amber-800 transition-colors duration-200"
            >
              {user?.email?.substr(0, 1)?.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Navbar };
