import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import logo from '../assets/favicon.svg'

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const {login , isAuthenticated , loading , error} = useAuth()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({email,password , rememberMe:keepLoggedIn})
  
    // TODO: hook into your AuthContext.login()
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated){
        navigate("/dashboard");
    }
  })

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
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
        {/* Title */}


        <h2 className="text-2xl font-bold text-[#004883]">Sign In</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your email and password to sign in!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#73777F] px-3 py-2 text-sm shadow-sm focus:border-[#004883] focus:ring-[#004883] focus:outline-none"
              minLength={8}
              required
            />
          </div>

          {
            error &&
           (<div className="text-red-500">
            <p className="text-sm">{error}</p>

          </div>
          )

        }

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#004883] focus:ring-[#004883]"
              />
              <span className="ml-2">Keep me logged in</span>
            </label>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-[#004883] hover:underline"
            >
              Forgot password?
            </button>
          </div>
{/* Submit */}
<button
  type="submit"
  className="w-full rounded-md bg-[#004883] py-2 text-white font-medium hover:bg-[#003366] transition-colors flex justify-center items-center"
  disabled={loading}
>
  {loading ? (
     <FaSpinner className="animate-spin text-lg" />

  ) : (
    "Sign In"
  )}
</button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Not registered yet?{" "}
          <a href="#" className="font-medium text-[#004883] hover:underline">
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
