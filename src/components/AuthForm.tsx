import React, { useState } from "react";
import { PiggyBank, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { registerAPICall } from "../api/service.api";
import { showSuccess } from "../utils/toast";

interface AuthFormProps {
  mode: "login" | "register";
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pageMode, setPageMode] = useState(mode);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (pageMode === "login") {
      try {
        await login(formData.email, formData.password);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await registerAPICall(formData.name, formData.email, formData.password);
        showSuccess("Account Created! Please login.");
        setPageMode("login");
      } finally {
        setFormData({ email: "", password: "", name: "" });
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setPageMode(pageMode === "login" ? "register" : "login");
  };

  return (
    // 🔹 Overlay (click outside to close)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 🔹 Stop click inside from closing modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full bg-white/60 dark:bg-gray-900 rounded-2xl shadow-2xl p-8 transition-all duration-300 transform scale-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-800 dark:hover:text-white text-2xl"
        >
          ✕
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center p-3 gap-3">
                    <div className="p-2 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
                      <PiggyBank className="text-white" size={32} />
                    </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {pageMode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {pageMode === "login"
              ? "Sign in to your expense tracker"
              : "Start tracking your expenses today"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {pageMode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Enter your password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
          >
            {loading
              ? "Please wait..."
              : pageMode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {pageMode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={toggleMode}
            >
              {pageMode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
