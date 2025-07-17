import { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        ErrorToast("Email & password are required!");
        return;
      }

      const dataObj = {
        email,
        password,
      };

      const result = await axiosInstance.post("/auth/login", dataObj);

      if (result.status === 200) {
        SuccessToast(result.data.message);
        window.open("/", "_self");
      } else {
        ErrorToast(result.data.message);
      }
    } catch (err) {
      ErrorToast(
        `Cannot signup: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-emerald-100">
        <h2 className="text-3xl font-bold text-center text-emerald-800">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-emerald-700 mb-1"
              htmlFor="user-email"
            >
              Email
            </label>
            <input
              id="user-email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-emerald-700 mb-1"
              htmlFor="user-password"
            >
              Password
            </label>
            <input
              id="user-password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition duration-200"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export { LoginPage };
