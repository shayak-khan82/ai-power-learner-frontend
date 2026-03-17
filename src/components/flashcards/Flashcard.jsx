import React, { useState } from 'react'
import {Star,RotateCcw} from "lucide-react"
const Flashcard = ({flashcard,onToggleStar}) => {
    const [isFlipped,setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }
//   return <div className='' style={{ perspective:`1000px`}}>
//     <div
//     className={`relative w-full h-full transition-transform duration-500 transform-gpu cursor-pointer`}
//     style={{
//         transformStyle:'preserve-3d',
//         transform: isFlipped ? 'rotateY(108deg)' : 'rotateY(0deg)'
//     }}
//     onClick={handleFlip}
//     >
//         {/*Front of the card (Question) */}
//         <div
//         className=''
//         style={{
//             backfaceVisibility:'hidden',
//             WebkitBackfaceVisibility:'hidden'
//         }}>
//             {/*Star Button*/}
//             <div className=''>
//                 <div className='bg-slate-100 text-[10px] text-slate-500 rounded px-4 py-1 uppercase'>{flashcard?.difficulty}</div>
//                 <button
//                 onClick={(e) => {
//                     e.stopPropagation()
//                     onToggleStar(flashcard._id)
//                 }}
//                 className={`w-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
//                     flashcard.isStarred
//                     ? 'bg-linear-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-500/25'
//                     : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-amber-500'
//                 }`}>
//                     <Star
//                     className=''
//                     strokeWidth={2}
//                     fill={flashcard.isStarred ? 'currentColor':'none'}
//                     />
//                 </button>
//             </div>
//             {/*Question Contenet */}
//             <div className=''>
//                 <p className=''>
//                     {flashcard.question}
//                 </p>
//             </div>
//         </div>
//         {/*Flip Indicator*/}
//         <div className=''>
//             <RotateCcw className='' strokeWidth={2}/>
//             <span>Click to reveal answer</span>
//         </div>
//     </div>
//   </div>
// return (
//   <div
//     className="w-full h-[420px]"
//     style={{ perspective: "1000px" }}
//   >
//     <div
//       className="relative w-full h-full transition-transform duration-500 transform-gpu cursor-pointer"
//       style={{
//         transformStyle: "preserve-3d",
//         transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
//       }}
//       onClick={handleFlip}
//     >

//       {/* FRONT SIDE */}
//       <div
//         className="
//         absolute inset-0
//         bg-gradient-to-br from-white to-slate-50
//         border border-slate-200
//         rounded-3xl
//         shadow-xl
//         p-6 flex flex-col justify-between
//         "
//         style={{
//           backfaceVisibility: "hidden",
//           WebkitBackfaceVisibility: "hidden",
//         }}
//       >

//         {/* Top Section */}
//         <div className="flex items-center justify-between">

//           {/* Difficulty Badge */}
//           <div className="bg-slate-100 text-[10px] text-slate-500 rounded-full px-4 py-1 uppercase tracking-wider font-semibold">
//             {flashcard?.difficulty}
//           </div>

//           {/* Star Button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onToggleStar(flashcard._id);
//             }}
//             className={`
//               w-10 h-10 rounded-xl flex items-center justify-center
//               transition-all duration-300
//               ${
//                 flashcard.isStarred
//                   ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-500/30 scale-105"
//                   : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-amber-500"
//               }
//             `}
//           >
//             <Star
//               className="w-5 h-5"
//               strokeWidth={2}
//               fill={flashcard.isStarred ? "currentColor" : "none"}
//             />
//           </button>

//         </div>

//         {/* Question Content */}
//         <div className="flex-1 flex items-center justify-center text-center px-4">
//           <p className="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed">
//             {flashcard.question}
           
            
//           </p>
//         </div>

//         {/* Flip Indicator */}
//         <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
//           <RotateCcw className="w-4 h-4" strokeWidth={2} />
//           <span>Click to reveal answer</span>
//         </div>

//       </div>

//       {/* BACK SIDE (Answer) */}
//       <div
//         className="
//         absolute inset-0
//         bg-gradient-to-br from-indigo-500 to-purple-600
//         text-white
//         rounded-3xl
//         shadow-xl
//         p-6 flex flex-col justify-center items-center text-center
//         "
//         style={{
//           transform: "rotateY(180deg)",
//           backfaceVisibility: "hidden",
//           WebkitBackfaceVisibility: "hidden",
//         }}
//       >
//         <p className="text-lg sm:text-xl font-semibold leading-relaxed">
//           {flashcard.answer}
           
//         </p>

//         <div className="mt-6 text-sm text-indigo-200 flex items-center gap-2">
//           <RotateCcw className="w-4 h-4" strokeWidth={2} />
//           <span>Click to go back</span>
//         </div>
//       </div>

//     </div>
//   </div>
// );

return (
  <div
    className="w-full max-w-xl mx-auto px-4"
    style={{ perspective: "1000px" }}
  >
    <div
      onClick={handleFlip}
      className="
        relative w-full
        h-[260px] sm:h-[320px] md:h-[380px]
        transition-transform duration-500
        transform-gpu cursor-pointer
      "
      style={{
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >

      {/* FRONT */}
      <div
        className="
          absolute inset-0
          bg-white
          rounded-2xl
          border border-gray-200
          shadow-md
          p-4 sm:p-6
          flex flex-col justify-between
        "
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >

        {/* Top Row */}
        <div className="flex items-center justify-between">

          <span className="text-[10px] px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold uppercase">
            {flashcard?.difficulty}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(flashcard._id);
            }}
            className={`
              w-8 h-8 sm:w-9 sm:h-9
              rounded-lg flex items-center justify-center
              transition-all duration-200
              ${
                flashcard.isStarred
                  ? "bg-yellow-400 text-white shadow"
                  : "bg-gray-100 text-gray-400 hover:text-yellow-500"
              }
            `}
          >
            <Star
              className="w-4 h-4"
              strokeWidth={2}
              fill={flashcard.isStarred ? "currentColor" : "none"}
            />
          </button>

        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center text-center px-2">
          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
            {flashcard.question}
          </p>
        </div>

        <div className="text-center text-xs text-gray-400">
          Tap to reveal answer
        </div>

      </div>

      {/* BACK */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br from-indigo-500 to-purple-600
          text-white
          rounded-2xl
          shadow-md
          p-4 sm:p-6
          flex flex-col justify-center items-center text-center
        "
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <p className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed">
          {flashcard.answer}
        </p>

        <div className="mt-4 text-xs text-indigo-200">
          Tap to flip back
        </div>
      </div>

    </div>
  </div>
);
}


export default Flashcard
