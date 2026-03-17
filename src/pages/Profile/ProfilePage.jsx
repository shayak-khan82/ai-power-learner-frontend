// import React,{useState,useEffect} from 'react'
// import PageHeader from '../../components/common/PageHeader'
// import Button from '../../components/common/Button'
// import Spinner from '../../components/common/Spinner'
// import authService from "../../services/authService"
// import {useAuth} from "../../context/AuthContext"
// import {User,Mail,Lock} from "lucide-react"
// import toast from 'react-hot-toast'



// const ProfilePage = () => {

//   const [loading,setLoading] = useState(true)
//   const [passwordLoading,setPasswordLoading] = useState(false)
//   const [username, setUsername] = useState("")
//   const [email,setEmail] = useState("")
//   const [currentPassword,setCurrentPassword] = useState("")
//   const [newPassword,setNewPassword] = useState("")
//   const [confirmNewPassword,setConfirmNewPassword] = useState("")

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const {data} = await authService.getProfile()
//         setUsername(data.username)
//         setEmail(data.email)
//       } catch (error) {
//         toast.error("failed to fetch profile data.")
//         console.error(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProfile()
//   },[])

//   const handleChangePassword = async(e) => {
//     e.preventDefault()
//     if(newPassword !== confirmNewPassword){
//       toast.error("New password do not match.")
//       return
//     }
//     if (newPassword.length < 6) {
//       toast.error("new password must ba at least 6 characters long")
//       return
//     }
//     setPasswordLoading(true)
//     try {
//       await authService.changePassword({currentPassword,newPassword})
//       toast.success("password changed successfully")
//       setCurrentPassword("")
//       setNewPassword("")
//       setConfirmNewPassword("")
//     } catch (error) {
//       toast.error(error.message || "Failed to change password")
//     } finally {
//       setPasswordLoading(false)
//     }
//   }

//   if (loading) {
//     return <Spinner/>
//   }


//   // return(
//   //   <div>
//   //     <PageHeader title="Profile Settings"/>
//   //     <div className="">
//   //       {/*User Information Display */}
//   //       <div className="">
//   //         <h3 className=''>
//   //           User Information
//   //         </h3>
//   //         <div className="">
//   //           <div>
//   //             <label className=''>
//   //               Username
//   //             </label>
//   //             <div className="">
//   //               <div className="">
//   //                 <User className=''/>
//   //               </div>
//   //               <p className=''>
//   //                 {username}
//   //               </p>
//   //             </div>
//   //           </div>
//   //         </div>
//   //         <label className=''>
//   //           Email Address
//   //         </label>
//   //         <div className=''>
//   //           <div className="">
//   //             <Mail className=''/>
//   //           </div>
//   //           <p className=''>
//   //             {email}
//   //           </p>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // )
//   return (
//   <div className="space-y-6">

//     {/* Page Header */}
//     <PageHeader title="Profile Settings" />

//     <div className="max-w-2xl">

//       {/* User Information Card */}
//       <div
//         className="
//         bg-white
//         border border-slate-200
//         rounded-2xl
//         p-6
//         shadow-sm
//         space-y-6
//         "
//       >

//         <h3 className="text-lg font-semibold text-slate-900">
//           User Information
//         </h3>


//         {/* Username */}
//         <div className="space-y-2">

//           <label className="text-sm font-medium text-slate-600">
//             Username
//           </label>

//           <div
//             className="
//             flex items-center gap-3
//             px-4 py-3
//             border border-slate-200
//             rounded-xl
//             bg-slate-50
//             "
//           >

//             <div className="text-slate-400">
//               <User className="w-5 h-5" />
//             </div>

//             <p className="text-sm font-medium text-slate-800">
//               {username}
//             </p>

//           </div>

//         </div>


//         {/* Email */}
//         <div className="space-y-2">

//           <label className="text-sm font-medium text-slate-600">
//             Email Address
//           </label>

//           <div
//             className="
//             flex items-center gap-3
//             px-4 py-3
//             border border-slate-200
//             rounded-xl
//             bg-slate-50
//             "
//           >

//             <div className="text-slate-400">
//               <Mail className="w-5 h-5" />
//             </div>

//             <p className="text-sm font-medium text-slate-800">
//               {email}
//             </p>

//           </div>

//         </div>

//       </div>
//       {/*Change Password form */}
//       {/* <div className="">
//         <h3 className=''>
//           Change Password
//         </h3>
//         <form onSubmit={handleChangePassword} className=''>
//           <div>
//             <label className=''>
//               Current Password
//             </label>
//             <div className="">
//               <div className="">
//                 <Lock className=''/>
//               </div>
//               <input
//               type="password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               required
//               className=''
//               />
//             </div>
//           </div>
//           <div className="">
//             <Button type='submit' disabled={passwordLoading}>
//               {passwordLoading ? "Changing...":"Change Password"}
//             </Button>
//           </div>
//         </form>
//       </div> */}
//       <div
//   className="
//   bg-white
//   border border-slate-200
//   rounded-2xl
//   p-6
//   shadow-sm
//   space-y-6
//   "
// >

//   <h3 className="text-lg font-semibold text-slate-900">
//     Change Password
//   </h3>

//   <form onSubmit={handleChangePassword} className="space-y-5">

//     {/* Current Password */}
//     <div className="space-y-2">

//       <label className="text-sm font-medium text-slate-600">
//         Current Password
//       </label>

//       <div
//         className="
//         flex items-center gap-3
//         px-4 py-3
//         border border-slate-200
//         rounded-xl
//         bg-slate-50
//         focus-within:ring-2
//         focus-within:ring-indigo-500/30
//         "
//       >

//         <div className="text-slate-400">
//           <Lock className="w-5 h-5" />
//         </div>

//         <input
//           type="password"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//           required
//           placeholder="Enter current password"
//           className="
//           flex-1
//           bg-transparent
//           outline-none
//           text-sm
//           text-slate-800
//           placeholder:text-slate-400
//           "
//         />

//       </div>

//     </div>


//     {/* Submit Button */}
//     <div>

//       <Button
//         type="submit"
//         disabled={passwordLoading}
//         className="
//         inline-flex items-center justify-center gap-2
//         px-6 h-10
//         rounded-xl
//         text-sm font-semibold
//         text-white
//         bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
//         hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700
//         shadow-lg shadow-indigo-500/25
//         hover:shadow-xl hover:shadow-indigo-500/40
//         transition-all duration-300
//         active:scale-95
//         disabled:opacity-50
//         disabled:cursor-not-allowed
//         "
//       >

//         {passwordLoading ? "Changing..." : "Change Password"}

//       </Button>

//     </div>

//   </form>

// </div>


//     </div>

//   </div>
// )
  
// }


// export default ProfilePage


import React, { useState, useEffect } from "react"
import PageHeader from "../../components/common/PageHeader"
import Button from "../../components/common/Button"
import Spinner from "../../components/common/Spinner"
import authService from "../../services/authService"
import { User, Mail, Lock } from "lucide-react"
import toast from "react-hot-toast"

const ProfilePage = () => {

  const [loading, setLoading] = useState(true)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")


  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response = await authService.getProfile()

        setUsername(response.data.username)
        setEmail(response.data.email)

      } catch (error) {

        toast.error("Failed to fetch profile data.")
        console.error(error)

      } finally {

        setLoading(false)

      }

    }

    fetchProfile()

  }, [])


  const handleChangePassword = async (e) => {

    e.preventDefault()

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.")
      return
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long")
      return
    }

    setPasswordLoading(true)

    try {

      await authService.changePassword({
        currentPassword,
        newPassword
      })

      toast.success("Password changed successfully")

      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")

    } catch (error) {

      toast.error(error.message || "Failed to change password")

    } finally {

      setPasswordLoading(false)

    }

  }


  if (loading) {
    return <Spinner />
  }


  // return (

  //   <div className="space-y-6">

  //     <PageHeader title="Profile Settings" />

  //     <div className="max-w-2xl space-y-6">


  //       {/* User Info Card */}
  //       <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">

  //         <h3 className="text-lg font-semibold text-slate-900">
  //           User Information
  //         </h3>


  //         {/* Username */}
  //         <div className="space-y-2">

  //           <label className="text-sm font-medium text-slate-600">
  //             Username
  //           </label>

  //           <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">

  //             <User className="w-5 h-5 text-slate-400" />

  //             <p className="text-sm font-medium text-slate-800">
  //               {username}
  //             </p>

  //           </div>

  //         </div>


  //         {/* Email */}
  //         <div className="space-y-2">

  //           <label className="text-sm font-medium text-slate-600">
  //             Email Address
  //           </label>

  //           <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">

  //             <Mail className="w-5 h-5 text-slate-400" />

  //             <p className="text-sm font-medium text-slate-800">
  //               {email}
  //             </p>

  //           </div>

  //         </div>

  //       </div>



  //       {/* Change Password Card */}
  //       <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">

  //         <h3 className="text-lg font-semibold text-slate-900">
  //           Change Password
  //         </h3>


  //         <form onSubmit={handleChangePassword} className="space-y-5">


  //           {/* Current Password */}
  //           <div className="space-y-2">

  //             <label className="text-sm font-medium text-slate-600">
  //               Current Password
  //             </label>

  //             <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">

  //               <Lock className="w-5 h-5 text-slate-400" />

  //               <input
  //                 type="password"
  //                 value={currentPassword}
  //                 onChange={(e) => setCurrentPassword(e.target.value)}
  //                 placeholder="Enter current password"
  //                 required
  //                 className="flex-1 bg-transparent outline-none text-sm"
  //               />

  //             </div>

  //           </div>



  //           {/* New Password */}
  //           <div className="space-y-2">

  //             <label className="text-sm font-medium text-slate-600">
  //               New Password
  //             </label>

  //             <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">

  //               <Lock className="w-5 h-5 text-slate-400" />

  //               <input
  //                 type="password"
  //                 value={newPassword}
  //                 onChange={(e) => setNewPassword(e.target.value)}
  //                 placeholder="Enter new password"
  //                 required
  //                 className="flex-1 bg-transparent outline-none text-sm"
  //               />

  //             </div>

  //           </div>



  //           {/* Confirm Password */}
  //           <div className="space-y-2">

  //             <label className="text-sm font-medium text-slate-600">
  //               Confirm New Password
  //             </label>

  //             <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">

  //               <Lock className="w-5 h-5 text-slate-400" />

  //               <input
  //                 type="password"
  //                 value={confirmNewPassword}
  //                 onChange={(e) => setConfirmNewPassword(e.target.value)}
  //                 placeholder="Confirm new password"
  //                 required
  //                 className="flex-1 bg-transparent outline-none text-sm"
  //               />

  //             </div>

  //           </div>



  //           {/* Submit Button */}
  //           <Button
  //             type="submit"
  //             disabled={passwordLoading}
  //             className="
  //             inline-flex items-center justify-center
  //             px-6 h-10
  //             rounded-xl
  //             text-sm font-semibold
  //             text-white
  //             bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
  //             hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700
  //             shadow-lg shadow-indigo-500/25
  //             hover:shadow-xl hover:shadow-indigo-500/40
  //             transition-all duration-300
  //             active:scale-95
  //             disabled:opacity-50
  //             disabled:cursor-not-allowed
  //             "
  //           >

  //             {passwordLoading ? "Changing..." : "Change Password"}

  //           </Button>

  //         </form>

  //       </div>

  //     </div>

  //   </div>

  // )
  return (
  <div className="min-h-screen bg-slate-50 px-4 sm:px-6 py-8">

    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <PageHeader title="Profile Settings" />

      {/* User Info Card */}
      <div className="
      bg-white
      border border-slate-200
      rounded-2xl
      p-5 sm:p-6
      shadow-sm
      space-y-6
      ">

        <h3 className="text-lg font-semibold text-slate-900">
          User Information
        </h3>

        {/* Username */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-600">
            Username
          </label>

          <div className="
          flex items-center gap-3
          px-4 py-3
          border border-slate-200
          rounded-xl
          bg-slate-50
          ">

            <User className="w-5 h-5 text-slate-400" />

            <p className="text-sm font-medium text-slate-800">
              {username}
            </p>

          </div>

        </div>


        {/* Email */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-600">
            Email Address
          </label>

          <div className="
          flex items-center gap-3
          px-4 py-3
          border border-slate-200
          rounded-xl
          bg-slate-50
          ">

            <Mail className="w-5 h-5 text-slate-400" />

            <p className="text-sm font-medium text-slate-800">
              {email}
            </p>

          </div>

        </div>

      </div>


      {/* Change Password Card */}
      <div className="
      bg-white
      border border-slate-200
      rounded-2xl
      p-5 sm:p-6
      shadow-sm
      space-y-6
      ">

        <h3 className="text-lg font-semibold text-slate-900">
          Change Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-5">

          {/* Current Password */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-600">
              Current Password
            </label>

            <div className="
            flex items-center gap-3
            px-4 py-3
            border border-slate-200
            rounded-xl
            bg-slate-50
            focus-within:ring-2
            focus-within:ring-indigo-500/30
            ">

              <Lock className="w-5 h-5 text-slate-400" />

              <input
                type="password"
                value={currentPassword}
                onChange={(e)=>setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="
                flex-1
                bg-transparent
                outline-none
                text-sm
                text-slate-800
                placeholder:text-slate-400
                "
              />

            </div>

          </div>


          {/* New Password */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-600">
              New Password
            </label>

            <div className="
            flex items-center gap-3
            px-4 py-3
            border border-slate-200
            rounded-xl
            bg-slate-50
            ">

              <Lock className="w-5 h-5 text-slate-400" />

              <input
                type="password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="flex-1 bg-transparent outline-none text-sm"
              />

            </div>

          </div>


          {/* Confirm Password */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-600">
              Confirm Password
            </label>

            <div className="
            flex items-center gap-3
            px-4 py-3
            border border-slate-200
            rounded-xl
            bg-slate-50
            ">

              <Lock className="w-5 h-5 text-slate-400" />

              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e)=>setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="flex-1 bg-transparent outline-none text-sm"
              />

            </div>

          </div>


          {/* Button */}
          <Button
            type="submit"
            disabled={passwordLoading}
            className="
            w-full sm:w-auto
            inline-flex items-center justify-center
            px-6 h-10
            rounded-xl
            text-sm font-semibold
            text-white
            bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
            hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700
            shadow-lg shadow-indigo-500/25
            hover:shadow-xl hover:shadow-indigo-500/40
            transition-all duration-300
            active:scale-95
            "
          >
            {passwordLoading ? "Changing..." : "Change Password"}
          </Button>

        </form>

      </div>

    </div>

  </div>
)

}

export default ProfilePage