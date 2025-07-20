import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const Navbar = (props) => {
  const { user = {} } = useAppContext();
  const navigate = useNavigate();
  const { text, handleSearchText } = props;

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

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className="p-4 flex items-center justify-between bg-gradient-to-r from-amber-500 to-amber-600 shadow-md">
      <div className="text-2xl font-bold text-white hover:text-amber-100 transition-colors">
        <Link to="/">CarRental</Link>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search cars by brand or model..."
            className="w-full py-2 px-4 pr-10 rounded-full border-none focus:ring-2 focus:ring-amber-300 focus:outline-none shadow-sm"
            onChange={(e) => {
              handleSearchText(e.target.value);
            }}
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 text-amber-600 hover:text-amber-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-white hover:text-amber-100 transition-colors duration-200 font-medium"
        >
          Home
        </Link>

        {!isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-amber-600 bg-white hover:bg-amber-50 transition-colors duration-200 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-white text-amber-600 rounded-md hover:bg-amber-50 transition-colors duration-200 font-medium shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md text-white hover:bg-amber-700 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
            <div
              onClick={handleOpenProfilePage}
              className="h-10 w-10 rounded-full bg-white text-amber-600 flex items-center justify-center cursor-pointer hover:bg-amber-100 transition-colors duration-200 font-bold shadow-sm"
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
