// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_API;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("login"); // "login" | "otp"
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const navigate = useNavigate();

  // Apply theme to <html> tag
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Countdown effect for OTP
  useEffect(() => {
    let timer;
    if (step === "otp" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (step === "otp" && timeLeft === 0) {
      setStep("login");
      setOtp("");
      setError("OTP expired. Please login again.");
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", response.data);
      setStep("otp");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  const handleOtpVerify = async () => {
    try {
      setError(null);
      setTimeLeft(300);
      const response = await axios.post(
        `${API_BASE}/api/auth/verify-otp`,
        { email, otp, device_fingerprint: "unique-browser-hash" },
        { withCredentials: true }
      );
      console.log("OTP Verify response:", response.data);
      localStorage.setItem("token", response?.data?.token);

      if (response.status === 200 && response.data.user) {
        const userData = response.data.user;
        if (userData.role === "admin") navigate("/admin");
        else if (userData.role === "clinician") navigate("/dashboard");
        else setError("Access Denied. Unauthorized role.");
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-darkModeBackGround transition-colors">
      <div className="absolute top-4 right-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded-lg border bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <div className="bg-white dark:bg-innerDarkColor shadow-lg rounded-2xl p-8 w-96 transition-colors">
        {step === "login" ? (
          <>
            <h2 className="text-2xl font-bold text-center text-primary dark:text-blue-400 mb-6">
              Login
            </h2>

            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter email"
            />

            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter password"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-accent text-white py-2 rounded-lg transition"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-primary dark:text-blue-400 mb-6">
              OTP Verification
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              A 6-digit OTP has been sent to your email: <br />
              <span className="font-semibold">{email}</span>
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full p-2 border rounded mb-4 text-center tracking-widest text-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter OTP"
            />

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              Time left:{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              onClick={handleOtpVerify}
              className="w-full bg-primary hover:bg-accent text-white py-2 rounded-lg transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
