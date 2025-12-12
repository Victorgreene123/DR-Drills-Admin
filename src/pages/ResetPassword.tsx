import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa6";
import logo from '../assets/favicon.svg';
import toast, { Toaster } from 'react-hot-toast';
import { useApi } from "../hooks/useApi";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { apiFetch } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user came from OTP verification
    const resetToken = sessionStorage.getItem("resetToken");
    const resetEmail = sessionStorage.getItem("resetEmail");
    
    if (!resetToken || !resetEmail) {
      toast.error("Session expired. Please try again.");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const resetToken = sessionStorage.getItem("resetToken");

      if (!resetToken) {
        toast.error("Reset token not found. Please try again.");
        navigate("/forgot-password");
        return;
      }

      const res = await apiFetch("/auth/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken,
          password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Password reset successfully");
        // Clear session storage
        sessionStorage.removeItem("resetToken");
        sessionStorage.removeItem("resetEmail");
        // Redirect to login after 1.5 seconds
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <Toaster position="top-right" />

      <div className="flex items-baseline mx-auto w-auto gap-3 mb-3">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <h2 className="text-[40px] font-bold text-[#004883]">Admin Panel</h2>
      </div>

      <div
        className="w-full max-w-md rounded-lg bg-white p-8"
        style={{
          border: "1px solid var(--Schemes-Outline-Variant, #C3C6CF)",
          boxShadow: "0px 11px 44.4px -17px #00000030",
        }}
      >
        <h2 className="text-2xl font-bold text-[#004883]">Reset Password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#73777F] px-3 py-2 text-sm shadow-sm focus:border-[#004883] focus:ring-[#004883] focus:outline-none pr-10"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73777F] hover:text-[#1A1C1E]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-[#73777F] px-3 py-2 text-sm shadow-sm focus:border-[#004883] focus:ring-[#004883] focus:outline-none pr-10"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73777F] hover:text-[#1A1C1E]"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-[#F2F3FA] rounded-lg p-3">
            <p className="text-xs font-medium text-[#73777F] mb-1">Password must contain:</p>
            <ul className="text-xs text-[#73777F] space-y-1">
              <li className={password.length >= 8 ? "text-green-600" : ""}>
                ✓ At least 8 characters
              </li>
            </ul>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-[#004883] py-2 text-white font-medium hover:bg-[#003366] transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-lg" />
                <span>Resetting...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-[#004883] hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
