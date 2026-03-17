import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen,Sparkles,TrendingUp } from 'lucide-react'
import moment from 'moment'
const FlashcardSetCard = ({flashcardSet}) => {

    const navigate = useNavigate()

    const handleStudyNow = () => {
        navigate(`/documents/${flashcardSet.documentId._id}/flashcards`)
    }
    const reviewedCount = flashcardSet.cards.filter(card => card.lastReviewed).length
    const totalCards = flashcardSet.cards.length
    const progressPercentage = totalCards > 0 ? Math.round((reviewedCount / totalCards)* 100) : 0;
//   return (
//     <div className=''
//     onClick={handleStudyNow}
//     >
//         <div className="">
//             {/*Icon and Title */}
//             <div className="">
//                 <div className="">
//                     <BookOpen className='' strokeWidth={2}/>
//                 </div>
//                 <div className="">
//                     <h3 className='' title={flashcardSet?.documentId?.title}>
//                         {flashcardSet?.documentId?.title}
//                     </h3>
//                     <p className=''>
//                         Created {moment(flashcardSet.createdAt).fromNow()}
//                     </p>
//                 </div>
//             </div>

//             {/* start*/}
//             <div className="">
//                 <div className="">
//                     <span className=''>
//                         {totalCards} {totalCards === 1 ? 'Card':'cards'}
//                     </span>
//                 </div>
//                 {reviewedCount > 0 && (
//                     <div className="">
//                         <TrendingUp className='' strokeWidth={2.5} />
//                         <span className=''>
//                             {progressPercentage}%
//                         </span>
//                     </div>
//                 )}
//             </div>
//             {/*Progress bar */}
//             {totalCards > 0 && (
//                 <div className="">
//                     <div className="">
//                         <span className="">
//                             Progress
//                         </span>
//                         <span className=''>
//                             {reviewedCount}/{totalCards} reviewed
//                         </span>
//                     </div>
//                     <div className="">
//                         <div className=""
//                         style={{width:`${progressPercentage}%`}} />
//                     </div>
//                 </div>
//             )}
//         </div>

//         {/* study Button */}
//         <div className="">
//             <button
//             onClick={(e) => {
//                 e.stopPropagation()
//                 handleStudyNow()
//             }}
//             className=''>
//                 <span className=''>
//                     <Sparkles className='' strokeWidth={2.5} />
//                     Study Now
//                 </span>
//                 <div className=''/>
//             </button>
//         </div>
      
//     </div>
//   )

      return (
  <div
    className="
    group cursor-pointer
    bg-white border border-slate-200
    rounded-2xl p-5
    shadow-sm hover:shadow-xl
    transition-all duration-300
    hover:-translate-y-1
    flex flex-col justify-between
    "
    onClick={handleStudyNow}
  >

    <div className="space-y-4">

      {/* Icon + Title */}
      <div className="flex items-center gap-3">

        <div className="
        w-10 h-10 flex items-center justify-center
        rounded-xl
        bg-gradient-to-br from-indigo-500 to-violet-600
        text-white shadow-md
        ">
          <BookOpen className="w-5 h-5" strokeWidth={2} />
        </div>

        <div className="flex-1">

          <h3
            className="text-sm font-semibold text-slate-900 truncate"
            title={flashcardSet?.documentId?.title}
          >
            {flashcardSet?.documentId?.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Created {moment(flashcardSet.createdAt).fromNow()}
          </p>

        </div>

      </div>


      {/* Stats */}
      <div className="flex items-center justify-between">

        <div className="
        px-3 py-1
        bg-slate-100 text-slate-600
        text-xs font-medium
        rounded-full
        ">
          {totalCards} {totalCards === 1 ? "Card" : "Cards"}
        </div>

        {reviewedCount > 0 && (
          <div className="
          flex items-center gap-1
          text-xs font-semibold
          text-emerald-600
          ">
            <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            {progressPercentage}%
          </div>
        )}

      </div>


      {/* Progress Bar */}
      {totalCards > 0 && (
        <div className="space-y-2">

          <div className="flex justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span>{reviewedCount}/{totalCards} reviewed</span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

            <div
              className="
              h-full
              bg-gradient-to-r from-emerald-500 to-teal-500
              transition-all duration-500
              "
              style={{ width: `${progressPercentage}%` }}
            />

          </div>

        </div>
      )}

    </div>


    {/* Study Button */}
    <div className="mt-5">

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleStudyNow()
        }}
        className="
        w-full
        inline-flex items-center justify-center gap-2
        px-5 h-10
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

        <Sparkles className="w-4 h-4" strokeWidth={2.5} />
        Study Now

      </button>

    </div>

  </div>
)
}

export default FlashcardSetCard
