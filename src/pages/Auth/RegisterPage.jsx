// import React, {useState} from "react";
// import { Link,useNavigate } from "react-router-dom";
// import authService from "../../services/authService";
// import { BrainCircuit,Mail,Lock,ArrowRight } from "lucide-react";
// import toast from "react-hot-toast";
// const RegisterPage= () => {
//   const [username,setUsername] =useState()
//   const [email,setEmail] =useState()
//   const[password,setPassword] = useState()
//   const[error,setError] =useState()
//   const[loading,setLoading] = useState(false)
//   const[focusedField,setFocusedField] =useState(null)

//   const navigate = useNavigate()


//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if(password.length < 6) {
//       setError("Password must be at least 6 character long.")
//       return
//     }
//     setError('');
//     setLoading(true)

//     try {
//       await authService.register(username,email,password)
//       toast.success('Registration in successfully! please login.');
//       navigate('/login')
//     } catch (error) {
//       setError(error.message || 'failed to register.please try again.')
//       toast.error(error.message || 'failed to register')
//     } finally {
//       setLoading(false)
//     }
//   }

// }
// export default RegisterPage

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { BrainCircuit, Mail, Lock, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authService.register(username, email, password);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.message || "Failed to register. Please try again.");
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-linear-to-br from-indigo-900 via-slate-900 to-purple-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-500/20 p-4 rounded-full">
                <BrainCircuit className="text-indigo-400" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-300 mt-2">
              Start your learning journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    focusedField === "username"
                      ? "text-indigo-400"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/70 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    focusedField === "email"
                      ? "text-indigo-400"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/70 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    focusedField === "password"
                      ? "text-indigo-400"
                      : "text-slate-400"
                  }`}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/70 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-400 text-red-300 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  Register
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              Login
            </Link>
          </div>

          <p className="mt-6 text-xs text-center text-slate-500">
            By continuing, you agree to our Terms & Privacy Policy
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;