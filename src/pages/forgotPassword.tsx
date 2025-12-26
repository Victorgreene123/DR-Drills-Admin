import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaArrowLeft } from "react-icons/fa6";
import logo from '../assets/favicon.svg';
import toast, { Toaster } from 'react-hot-toast';
import { useApi } from "../hooks/useApi";

type ForgotPasswordStep = "email" | "otp";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { apiFetch } = useApi();
  const navigate = useNavigate();

  // Timer for resend button
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const res = await apiFetch("/auth/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "OTP sent to your email");
        // Store email for next steps
        sessionStorage.setItem("resetEmail", email);
        setStep("otp");
        setResendTimer(60);
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim() || otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await apiFetch("/auth/admin/verify-forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          code: otp 
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "OTP verified successfully");
        // Store reset token from response for password reset
        sessionStorage.setItem("resetToken", result.data?.resetToken || result.resetToken || "");
        sessionStorage.setItem("resetEmail", email);
        navigate("/reset-password");
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const res = await apiFetch("/auth/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "OTP resent to your email");
        setResendTimer(60);
      } else {
        toast.error(result.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resending OTP");
    } finally {
      setResendLoading(false);
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
        className="w-full max-w-md rounded-lg bg-white p-8 relative"
        style={{
          border: "1px solid var(--Schemes-Outline-Variant, #C3C6CF)",
          boxShadow: "0px 11px 44.4px -17px #00000030",
        }}
      >
        {/* Back Button */}
        {step === "otp" && (
          <button
            onClick={() => {
              setStep("email");
              setOtp("");
            }}
            className="mb-4 flex items-center gap-2 text-[#004883] hover:text-[#003366] transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        {/* Email Step */}
        {step === "email" ? (
          <>
            <h2 className="text-2xl font-bold text-[#004883]">Forgot Password</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter your email to receive an OTP code
            </p>

            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="mail@simmpple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#73777F] px-3 py-2 text-sm shadow-sm focus:border-[#004883] focus:ring-[#004883] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#004883] py-2 text-white font-medium hover:bg-[#003366] transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* OTP Step */}
            <h2 className="text-2xl font-bold text-[#004883]">Verify OTP</h2>
            <p className="mt-1 text-sm text-gray-600">
              We've sent a code to <br />
              <span className="font-medium text-[#1A1C1E]">{email}</span>
            </p>

            <form onSubmit={handleOtpSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="mt-1 w-full rounded-md border border-[#73777F] px-3 py-2 text-sm shadow-sm focus:border-[#004883] focus:ring-[#004883] focus:outline-none text-center text-2xl tracking-widest"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#004883] py-2 text-white font-medium hover:bg-[#003366] transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend code in <span className="font-semibold text-[#004883]">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  className="text-sm font-medium text-[#004883] hover:text-[#003366] disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
                >
                  {resendLoading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Resending...</span>
                    </>
                  ) : (
                    "Didn't receive code? Resend"
                  )}
                </button>
              )}
            </div>
          </>
        )}

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

export default ForgotPassword;
