import React from 'react'

// import { NavLink,useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { LayoutDashboard,FileText,User,LogOut,BrainCircuit,BookOpen,X, icons } from 'lucide-react'

// const Sidebar = ({isSidebarOpen,toggleSidebar}) => {
//     const {logout} = useAuth()
//     const navigate = useNavigate()

//     const handleLogout = ()=>{
//         logout()
//         navigate('/login')
//     }
//     const navLinks = [
//         {to:'/dashboard',icon:LayoutDashboard,text:'Dashboard'},
//         {to:'/documents',icon:FileText,text:'Documents'},
//         {to:'flashcards',icon:BookOpen,text:'Flashcards'},
//         {to:'/profile',icon:User,text:'Profile'},
//     ]
//     return <>

//     <div className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${
//     isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//   }`} 
//   onClick={toggleSidebar}
//   aria-hidden="true">
//     <aside 
//     className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-slate-200/60 z-50 md:relative md:w-64 md:shrink-0 md:flex-col md:translate-x-0 trasition-transform duration-300 ease-in ${

//    isSidebarOpen ? 'translate-x-0':'-translate-x-full' }`}>

//     {/*Logo and close button for mobile */}
//     <div className=''>
//         <div className=''>
//             <div className=''>
//                 <BrainCircuit className='' size={20} strokeWidth={2.5} />
//             </div>
//             <h1 className=''>Al learning Assistant</h1>
//         </div>
//         <button onClick={toggleSidebar} className=''>
//             <X size={24} />
//         </button>
//     </div>
//     {/*Navigation */}
//     <nav className=''>
//         {navLinks.map((link) => (
//             <NavLink
//             key={link.to}
//             to={link.to}
//             onClick={toggleSidebar}
//             className={({isActive}) =>
//            `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${

//             isActive ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
//         :    'text-slate-700 hover:bg-slate-100 hover:text-slate-900' }` } >
//             {({ isActive}) => (
//                 <>
//                 <line.icon
//                 size={18}
//                 strokeWidth={2.5}
//                 className={`transition-transform duration-200 ${
//                     isActive ? '' : 'group-hover:scale-110'
//                 }`}
//                 />
//                 {line.text}
//                 </>
//             )}
//         </NavLink>
//         ))}
//     </nav>

//     {/*Logout Section */}
//     <div className="">
//         <button
//         onClick={handleLogout}
//         className=''>
//             <LogOut
//             size={18}
//             strokeWidth={2.5}
//             className=''
//             />
//             Logout
//         </button>
//     </div>
//    </aside>
//   </div>
//     </>
// }

// export default Sidebar

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  BrainCircuit,
  BookOpen,
  X,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/documents", icon: FileText, text: "Documents" },
    { to: "/flashcards", icon: BookOpen, text: "Flashcards" },
    { to: "/profile", icon: User, text: "Profile" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0`}
      >
        {/* Logo Section */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-xl">
                <BrainCircuit
                  className="text-emerald-600"
                  size={22}
                  strokeWidth={2.5}
                />
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">
                AI Learning
              </h1>
            </div>

            {/* Close button mobile */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-slate-500 hover:text-slate-800"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${
                          isActive ? "" : "group-hover:scale-110"
                        }`}
                      />
                      {link.text}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="px-4 py-5 border-t border-slate-200/60">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut size={18} strokeWidth={2.5} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;