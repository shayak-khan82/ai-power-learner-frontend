import React from 'react'
import { Link } from 'react-router-dom'
import { Play,BarChart2,Trash2,Award } from 'lucide-react'
import moment from 'moment'

const QuizCard = ({quiz,onDelete}) => {
//   return (
//     <div className=''>
//         <button
//         onClick={(e) => {
//             e.stopPropagation()
//             OnDelete(quiz)
//         }}
//         className=''
//         >
//             <Trash2 className='' strokeWidth={2}/>
//         </button>
//         <div className=''>
//             {/**Status Badge */}
//             <div className=''>
//                 <div className=''>
//                     <Award className='' strokeWidth={2.5}/>
//                     <span className=''>Score: {quiz?.score}</span>
//                 </div>

//             </div>


//             <div>
//                 <h3 
//                 className=''
//                 title={quiz.title}>
//                     {quiz.title ||
//                     `Quiz - ${moment(quiz.createdAt).format("MMM D, YYYY")}`}
//                 </h3>
//                 <p className=''>
//                     Created {moment(quiz.createdAt).format("MMM D, YYYY")}
//                 </p>
//             </div>


//             {/*Quiz info */}
//             <div className=''>
//                 <div className=''>
//                     <div className=''>
//                         <span className=''>
//                             {quiz.questions.length}{" "}
//                             {quiz.questions.length === 1 ? "Question":"Questions"}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//             {/*Action Button */}
//             <div className=''>
//                 {quiz?.userAnswers?.length > 0 ? (
//                     <Link to={`/quizzes/${quiz._id}/results`}>
//                         <button className=''>
//                             <BarChart2 className='' strokeWidth={2.5}/>
//                             View Results
//                         </button>
//                     </Link>
//                 ): (
//                     <Link to={`/quizzes/${quiz._id}`}>
//                         <button className=''>
//                             <span className=''>
//                                 <Play className='' strokeWidth={2.5}/>
//                                 Start Quiz
//                             </span>
//                             <div className=''/>
//                         </button>
//                     </Link>
//                 )}
//             </div>
//         </div>
      
//     </div>
//   )
return (
  <div
    className="
      group relative
      bg-white
      border border-slate-200
      rounded-2xl
      p-5 sm:p-6
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
    "
  >

    {/* Delete Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(quiz);
      }}
      className="
        absolute top-4 right-4
        w-9 h-9 flex items-center justify-center
        rounded-lg
        text-rose-500
        hover:bg-rose-50
        hover:text-rose-600
        transition
      "
    >
      <Trash2 className="w-4 h-4" strokeWidth={2} />
    </button>

    {/* Score Badge */}
    <div className="mb-4">
      <div className="
        inline-flex items-center gap-2
        px-3 py-1.5
        rounded-full
        bg-indigo-50
        text-indigo-600
        text-xs font-semibold
      ">
        <Award className="w-4 h-4" strokeWidth={2.5} />
        <span>Score: {quiz?.score ?? 0}</span>
      </div>
    </div>

    {/* Title & Date */}
    <div className="mb-4">
      <h3
        className="text-base sm:text-lg font-semibold text-slate-900 truncate"
        title={quiz.title}
      >
        {quiz.title ||
          `Quiz - ${moment(quiz.createdAt).format("MMM D, YYYY")}`}
      </h3>

      <p className="text-xs text-slate-500 mt-1">
        Created {moment(quiz.createdAt).format("MMM D, YYYY")}
      </p>
    </div>

    {/* Quiz Info */}
    <div className="mb-5">
      <span className="
        inline-flex items-center px-3 py-1
        text-xs font-medium
        bg-slate-100
        text-slate-600
        rounded-full
      ">
        {quiz.questions.length}{" "}
        {quiz.questions.length === 1 ? "Question" : "Questions"}
      </span>
    </div>

    {/* Action Button */}
    <div>
      {quiz?.userAnswers?.length > 0 ? (
        <Link to={`/quizzes/${quiz._id}/results`}>
          <button
            className="
              w-full
              inline-flex items-center justify-center gap-2
              px-5 h-11
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
            <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
            View Results
          </button>
        </Link>
      ) : (
        <Link to={`/quizzes/${quiz._id}`}>
          <button
            className="
              w-full
              inline-flex items-center justify-center gap-2
              px-5 h-11
              rounded-xl
              text-sm font-semibold
              text-white
              bg-gradient-to-r from-emerald-500 to-teal-500
              hover:from-emerald-600 hover:to-teal-600
              shadow-lg shadow-emerald-500/25
              hover:shadow-xl hover:shadow-emerald-500/40
              transition-all duration-300
              active:scale-95
            "
          >
            <Play className="w-4 h-4" strokeWidth={2.5} />
            Start Quiz
          </button>
        </Link>
      )}
    </div>

  </div>
);
}

export default QuizCard
