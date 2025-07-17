import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const SignupPage = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (isOtpSent) {
      try {
        if (!email || !password || !otp) {
          ErrorToast("Email, password & otp are required!");
          return;
        }

        const dataObj = {
          email,
          password,
          otp,
        };

        const result = await axiosInstance.post("/auth/signup", dataObj);

        if (result.status === 201) {
          SuccessToast(result.data.message);
          navigate("/login");
        } else {
          ErrorToast(result.data.message);
        }
      } catch (err) {
        ErrorToast(
          `Cannot signup: ${err.response?.data?.message || err.message}`
        );
      }
    } else {
      ErrorToast(`Cannot signup before sending otp`);
    }
  };

  const handleSendOtp = async () => {
    try {
      const resp = await axiosInstance.post("/auth/send-otp", {
        email,
      });
      if (resp.data.isSuccess) {
        SuccessToast(resp.data.message);
        setIsOtpSent(true);
      } else {
        SuccessToast(resp.data.message);
      }
    } catch (err) {
      console.log(err);
      ErrorToast(
        `Cannot send otp: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-emerald-100">
        <h2 className="text-3xl font-bold text-center text-emerald-800">
          Create Account
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

          {isOtpSent && (
            <>
              <div>
                <label
                  className="block text-sm font-medium text-emerald-700 mb-1"
                  htmlFor="user-otp"
                >
                  OTP
                </label>
                <input
                  id="user-otp"
                  type="text"
                  name="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200"
                  placeholder="Enter 6-digit OTP"
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
                  placeholder="Create password"
                />
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          {isOtpSent ? (
            <button
              onClick={handleRegister}
              className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              Complete Registration
            </button>
          ) : (
            <button
              onClick={handleSendOtp}
              className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              Send OTP
            </button>
          )}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition duration-200"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { SignupPage };
