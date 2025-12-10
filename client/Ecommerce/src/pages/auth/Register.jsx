import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userRegister } from "../../api/authApi";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength checker
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    if (passwordStrength >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong";
    if (passwordStrength >= 50) return "Good";
    if (passwordStrength >= 25) return "Weak";
    return "Very Weak";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (passwordStrength < 50) {
      setErrorMsg("Please use a stronger password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await userRegister(userName, email, password);
      console.log("Registration successful:", response.data);
      
      // Show success state before redirect
      setIsLoading(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 md:p-6">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10"
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.2 + 0.05,
            }}
          />
        ))}
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-8 md:p-10 border border-white/20"
      >
        {/* Decorative Corners */}
        <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-xl" />

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
            >
              <SparklesIcon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                StyleCart
              </h1>
              <p className="text-xs text-gray-400">Join Our Community</p>
            </div>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
            <UserIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Create Account</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            Start Your Journey 🚀
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Create your account to explore premium products and exclusive offers
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <p className="text-red-400 text-sm text-center font-medium">
              {errorMsg}
            </p>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-900/40 backdrop-blur-md text-white rounded-xl border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder-gray-500"
                placeholder="John Doe"
              />
              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-900/40 backdrop-blur-md text-white rounded-xl border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder-gray-500"
                placeholder="you@example.com"
              />
              <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <LockClosedIcon className="w-4 h-4" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-3.5 bg-gray-900/40 backdrop-blur-md text-white rounded-xl border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder-gray-500"
                placeholder="Create a strong password"
              />
              <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Meter */}
            {password && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Password strength:</span>
                  <span className={`font-medium ${
                    passwordStrength >= 75 ? "text-green-400" :
                    passwordStrength >= 50 ? "text-yellow-400" :
                    passwordStrength >= 25 ? "text-orange-400" : "text-red-400"
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${passwordStrength}%` }}
                    transition={{ duration: 0.3 }}
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                  />
                </div>
                <ul className="grid grid-cols-2 gap-1 text-xs text-gray-400 mt-2">
                  <li className={`flex items-center gap-1 ${password.length >= 8 ? "text-green-400" : ""}`}>
                    {password.length >= 8 ? <CheckCircleIcon className="w-3 h-3" /> : "○"} 8+ characters
                  </li>
                  <li className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? "text-green-400" : ""}`}>
                    {/[A-Z]/.test(password) ? <CheckCircleIcon className="w-3 h-3" /> : "○"} Uppercase letter
                  </li>
                  <li className={`flex items-center gap-1 ${/[0-9]/.test(password) ? "text-green-400" : ""}`}>
                    {/[0-9]/.test(password) ? <CheckCircleIcon className="w-3 h-3" /> : "○"} Number
                  </li>
                  <li className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? "text-green-400" : ""}`}>
                    {/[^A-Za-z0-9]/.test(password) ? <CheckCircleIcon className="w-3 h-3" /> : "○"} Special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <LockClosedIcon className="w-4 h-4" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-3.5 bg-gray-900/40 backdrop-blur-md text-white rounded-xl border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder-gray-500"
                placeholder="Confirm your password"
              />
              <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ✗ Passwords do not match
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                ✓ Passwords match
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-primary rounded border-gray-600 bg-gray-800 focus:ring-primary/30"
            />
            <span className="text-sm text-gray-400">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:text-primary/80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <span className="px-4 text-sm text-gray-500">Already Registered?</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
            >
              Sign in here
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
          <p className="text-gray-500 text-xs mt-3">
            By creating an account, you agree to receive updates and special offers
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;