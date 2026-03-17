import React from 'react'
import { FileText,Plus } from 'lucide-react'
const EmptyState = ({onActionClick,title,description,buttonText}) => {
  return (
    // <div className=''>
    //     <div className=''>
    //         <FileText className=''strokeWidth={2}/>
    //     </div>
    //     <h3 className=''>{title}</h3>
    //     <p className=''>{description}</p>
    //     {buttonText && onActionClick && (
    //   <button
    //   onClick={onActionClick}
    //   className=''
    //   >
    //     <span className=''>
    //         <Plus className='' strokeWidth={2.5}/>
    //         {buttonText}
    //     </span>
    //     <div className='' />
    //   </button>
    //   )}
    // </div>
    <div
  className="
    group relative
    w-full
    bg-gradient-to-br from-white to-slate-50
    border border-slate-200
    rounded-2xl
    p-6 sm:p-8
    shadow-sm
    hover:shadow-xl
    hover:-translate-y-1
    transition-all duration-300
    text-center
  "
>

  {/* Icon */}
  <div
    className="
      mx-auto mb-5
      w-14 h-14
      flex items-center justify-center
      rounded-2xl
      bg-gradient-to-br from-indigo-500 to-violet-600
      text-white
      shadow-md
    "
  >
    <FileText className="w-6 h-6" strokeWidth={2} />
  </div>

  {/* Title */}
  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
    {title}
  </h3>

  {/* Description */}
  <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
    {description}
  </p>

  {/* Action Button */}
  {buttonText && onActionClick && (
    <button
      onClick={onActionClick}
      className="
        group inline-flex items-center justify-center gap-2
        px-6 h-11
        rounded-xl
        text-sm font-semibold tracking-wide
        text-white
        bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
        hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700
        transition-all duration-300
        shadow-lg shadow-indigo-500/25
        hover:shadow-xl hover:shadow-indigo-500/40
        active:scale-95
      "
    >
      <Plus
        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"
        strokeWidth={2.5}
      />
      {buttonText}
    </button>
  )}

</div>
  )
}

export default EmptyState
