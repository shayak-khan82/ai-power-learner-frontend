// import React from 'react'
// import {useNavigate} from 'react-router-dom'
// import { FileText,Trash2,BrainCircuit,Clock, BookOpen } from 'lucide-react'
// import moment from 'moment'

// //helper functiin to format file size

// const formatFileSize = (bytes) => {
//     if(bytes === undefined || bytes === null) return 'N/A'

//     const units = ['B','KB','MB','GB','TB'];
//     let size = bytes
//     let unitIndex = 0;
//     while (size >= 1024 && unitIndex < units.length -1) {
//         size /= 1024;
//         unitIndex++;
//     }
//     return `${size.toFixed(1)} ${units[unitIndex]}`;
// }

//     const DocumentCard = ({document,onDelete}) => {

//         const navigate = useNavigate()

//         const handleNavigate = () => {
//             navigate(`/documents/${document._id}`)
//         }

//         const handleDelete = (e) => {
//             e.stopPropagation()
//             onDelete(document)
//         }

//         return <div
//         className=''
//         onClick={handleNavigate}>
//         {/*Header Section */}
//         <div>
//             <div className=''>
//                 <div className=''>
//                     <FileText className='' strokeWidth={2}/>
//                 </div>
//                 <button
//                 onClick={handleDelete}
//                 className=''
//                 >
//                  <Trash2 className='' strokeWidth={2}/>  
//                 </button>
//             </div>

//             {/*Title */}
//             <h3 className='' title={document.title}>
//                 {document.title}
//             </h3>
//             {/*Document info */}
//             <div className=''>
//                 {document.fileSize !== undefined && (
//                     <>
//                     <span className=''>{formatFileSize(document.fileSize)}</span>
//                     </>
//                 )}
//             </div>

//             {/*Starts section */}
//             <div className=''>
//                 {document.flashcardCount !== undefined && (
//                     <div className=''>
//                         <BookOpen className='' strokeWidth={2}/>
//                         <span className=''>{document.quizCount} Quizzes</span>
//                     </div>
//                 )}

//             </div>
//              </div>
//              {/*Footer Sectio */}
//              <div className=''>
//                 <div className=''>
//                     <Clock className='' strokeWidth={2}/>
//                     <span>Uploaded {moment(document.createdAt).fromNow()}</span>
//                 </div>
//              </div>
//              {/*Hover Indicator */}
//              <div className=''>
                
//              </div>
//     </div>
        
//     }


// export default DocumentCard

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Trash2, Clock, BookOpen } from 'lucide-react'
import moment from 'moment'

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (!bytes) return 'N/A'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = Number(bytes)
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

const DocumentCard = ({ document, onDelete }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/documents/${document._id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(document)
  }

  return (
    <div
      onClick={handleNavigate}
      className="
        group relative cursor-pointer
        bg-white border border-slate-200
        rounded-2xl p-5
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
    >

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition duration-500 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">

        {/* File Icon */}
        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-50">
          <FileText className="text-indigo-600" size={20} strokeWidth={2} />
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="
            p-2 rounded-lg
            text-slate-400 hover:text-red-500
            hover:bg-red-50
            transition
          "
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Title */}
      <h3
        className="
          relative z-10
          font-semibold text-slate-800
          text-lg mb-2
          truncate
        "
        title={document.title}
      >
        {document.title}
      </h3>

      {/* File Size */}
      <div className="relative z-10 text-sm text-slate-500 mb-4">
        {document.fileSize && (
          <span>{formatFileSize(document.fileSize)}</span>
        )}
      </div>

      {/* Stats */}
      <div className="relative z-10 flex items-center gap-4 text-sm text-slate-600 mb-6">

        {document.quizCount !== undefined && (
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-indigo-500" />
            <span>{document.quizCount} Quizzes</span>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center text-xs text-slate-400 border-t pt-3">
        <Clock size={14} className="mr-1.5" />
        <span>
          Uploaded {moment(document.createdAt).fromNow()}
        </span>
      </div>

    </div>
  )
}

export default DocumentCard