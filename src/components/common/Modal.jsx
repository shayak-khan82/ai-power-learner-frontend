import { X } from 'lucide-react'
import React from 'react'

const Modal = ({isOpen,onClose,title,children}) => {
if(!isOpen) return null
//   return <div className=''>
//     <div className=''>
//         <div className=''>
//             onClick={onClose}
//         </div>
//         <div className=''>
//             <button
//             onClick={onClose}
//             className=''
//             >
//                 <X className='' strokeWidth={2}/>
//             </button>

//             <div className=''>
//                 <h3 className=''>
//                     {title}
//                 </h3>
//             </div>
//             <div>{children}</div>
//         </div>
//     </div>
//   </div>
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* Overlay */}
    <div
      onClick={onClose}
      className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
    />

    {/* Modal Card */}
    <div className="relative z-10 w-full max-w-lg mx-4 
      bg-white rounded-2xl shadow-2xl border border-gray-200
      p-6 animate-[fadeIn_0.3s_ease-out]">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center 
          rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
        </button>

      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-4" />

      {/* Content */}
      <div className="text-sm text-gray-700">
        {children}
      </div>

    </div>
  </div>
);
}

export default Modal
