import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";
import { BrainCircuit,Mail,Lock,ArrowRight} from 'lucide-react'
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email,setEmail] =useState('')
  const[password,setPassword] = useState('')
  const[error,setError] = useState('');
  const[loading,setLoading] =useState(false)
  const[focusedField,setFocusedField]=useState(null)

  const navigate = useNavigate();
  const {login} = useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('')
    setLoading(true)
    try {
      const {token,user} =await authService.login(email,password)
      login(user,token)
      toast.success('Logged in successfully')
      navigate('/dashboard')
    } catch (error) {
      setError(error.message || 'Failed to login.please check your credentials.')
      toast.error(error.message || 'failed to login')
    } finally {
      setLoading(false)
    }
  }
  // return (
  //   <div className="">

  //     <div className="">

  //       <div className="">

  //         <div className="">
  //           {/* header*/}
  //           <div className="">
  //             <div className="">
  //               <BrainCircuit className="" strokeWidth={2}/>
  //             </div>
  //             <h1 className="">
  //               Welcome back
  //             </h1>
  //             <p className="">
  //               Sign in to continue your journey
  //             </p>
  //           </div>

  //           {/*form */}
  //           <div className="">
  //             {/* Email field */}
  //             <div className="">
  //               <label className="">
  //                 Email
  //               </label>
  //               <div className="">
  //                 <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
  //                   focusedField === 'email' ? 'text-emerald-500':'text-slate-400'
  //                 }`}>
  //                   <Mail className="" strokeWidth={2} />
  //                 </div>

  //                 <input
  //                  type="email"
  //                  value={email}
  //                  onChange={(e) => setEmail(e.target.value)}
  //                  onFocus={() => setFocusedField('email')}
  //                  onBlur={() => setFocusedField(null)}
  //                  className=""
  //                  placeholder="you@example.com"
  //                  />


  //                  {/*Password field */}
  //                  <div className="">
  //                   <label className="">
  //                     Password
  //                   </label>
  //                   <div className="">
  //                     <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
  //                       focusedField === 'password' ? 'text-emerald-500':'text-slate-400'
  //                     }`}>
  //                       <Lock className="" strokeWidth={2}/>
  //                     </div>
  //                     <input
  //                     type="password"
  //                     value={password}
  //                     onChange={(e) => setPassword(e.target.value)}
  //                     onFocus={() => setFocusedField('password')}
  //                     onBlur={() => setFocusedField(null)}
  //                     className=""
  //                     placeholder="********"
  //                     />
  //                   </div>

  //                  </div>

  //                  {/*Error message */}
  //                  {error && (
  //                   <div className="">
  //                     <p className="">{error}</p>
  //                     </div>
  //                  )}

  //                  {/*Submit Button */}
  //                  <button 
  //                  onClick={handleSubmit}
  //                  disabled={loading}
  //                  className="">

  //                   <span className="">
  //                     {loading ? (
  //                       <>
  //                       <div className=""/>
  //                       Signing in...
  //                       </>
  //                     ) :(
  //                       <>
  //                       Sign in 
  //                       <ArrowRight className="" strokeWidth={2.5}/>
  //                       </>
  //                     )}

  //                   </span>
  //                   <div className=""/>
  //                  </button>
  //               </div>

  //               {/* Footer */}
  //               <div className="">
  //                 <p className="">
  //                   Don't have an account?{' '}
  //                   <Link to='/register' className="">
  //                   Sign up 
  //                   </Link>
  //                 </p>
  //               </div>
  //             </div>
  //             {/*Subtle footer text */}
  //             <p className="">
  //               BY continuing , you agree to our terms & Privacy Policy
  //             </p>
  //           </div>
  //         </div>
  //       </div>

  //     </div>

  //   </div>
  // )
  return (
  <div className="min-h-screen  bg-linear-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center px-4">

    <div className="w-full max-w-md">
      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-500/20 p-4 rounded-full">
              <BrainCircuit className="text-emerald-400" size={32} strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-300 mt-2">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === "email"
                    ? "text-emerald-400"
                    : "text-slate-400"
                }`}
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/70 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === "password"
                    ? "text-emerald-400"
                    : "text-slate-400"
                }`}
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="********"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/70 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
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
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition"
          >
            Sign up
          </Link>
        </div>

        <p className="mt-6 text-xs text-center text-slate-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  </div>
);


}

export default LoginPage