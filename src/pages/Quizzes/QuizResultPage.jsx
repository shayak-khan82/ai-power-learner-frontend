// import React,{useState,useEffect} from 'react'
// import { useParams,Link } from 'react-router-dom'
// import quizService from '../../services/quizService'
// import PageHeader from '../../components/common/PageHeader'
// import Spinner from '../../components/common/Spinner'
// import toast from 'react-hot-toast'
// import { ArrowLeft,CheckCircle,XCircle,Trophy,Target,BookOpen, CheckCircle2 } from 'lucide-react'



// const QuizResultPage = () => {
//   const{quizId} = useParams()
//   const [results,setResults] = useState(null)
//   const[loading,setLoading] = useState(true)

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const data = await quizService.getQuizResults(quizId)
//         setResults(data)
//       } catch (error) {
//         toast.error('failed to fetch quiz results');
//         console.error(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchResults()

//   },[quizId])

//   if (loading) {
//     return (
//       <div className=''>
//         <Spinner/>
//       </div>
//     )
//   }
//   if (!results || !results.data) {
//     return (
//       <div className=''>
//         <div className=''>
//           <p className=''>Quiz results not found.</p>
//         </div>
//       </div>
//     )
//   }
//   const {data: {quiz, results: detailedResults } } = results
//   const score = quiz.score
//   const totalQuestion = detailedResults.length
//   const correctAnswer = detailedResults.filteer(r => r.isCorrect).length
//   const incorrectAnswer = totalQuestion - correctAnswer

//   const getScoreColor = (score) => {
//     if(score >= 80) return 'from-emerald-500 to-teal-500'
//     if(score >= 60) return 'from-amber-500 to-orange-500'
//     return 'from-rose-500 to-red-500'
//   }
//   const getScoreMessage = (score) => {
//     if(score >= 90) return 'Outstanding! ';
//     if(score >= 80) return 'Great job! '
//     if(score >= 70) return 'Good work'
//     if(score >= 60) return 'not bad'
//     return 'Keep practicing'
//   }
//   return (
//     <div className=''>
//       {/*Back Button */}
//       <div className=''>
//         <Link to={`/documents/${quiz.document._id}`}
//         className=''
//         >
//           <ArrowLeft className='' strokeWidth={2}/>
//           Back to Document
//         </Link>
//       </div>
//       <PageHeader title={`${quiz.title || 'Quiz'}Results`} />

//       {/*Score Card */}
//       <div className=''>
//         <div className=''>
//           <div className=''>
//             <Trophy className='' strokeWidth={2}/>
//           </div>

//           <div>
//             <p className=''>
//               Your Score
//             </p>
//             <div className={`inline-block text-5xl font-bold bg-linear-to-r ${getScoreColor(score)} bg-clip-text text-transparent mb-2`}>
//               {score}%
//             </div>
//             <p className=''>
//               {getScoreMessage(score)}
//             </p>
//           </div>
//           {/*Start */}
//           <div className=''>
//             <div className=''>
//               <Target className='' strokeWidth={2}/>
//               <span className=''>
//                 {totalQuestion} Total
//               </span>
//             </div>
//             <div className="">
//               <CheckCircle2 className='' strokeWidth={2}/>
//               <span className=''>
//                 {correctAnswer}Correct
//               </span>
//             </div>
//             <div className="">
//               <XCircle className='' strokeWidth={2}/>
//               <span className=''>
//                 {incorrectAnswer}Incorrect
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/*Question review */}
//       <div className="">
//         <div className="">
//           <BookOpen className='' strokeWidth={2}/>
//           <h3 className=''>Detailed Review</h3>
//         </div>
//         {detailedResults.map((result,index) => {
//           const userAnswerIndex = result.options.findIndex(opt => opt === result.selectedAnswer)
//           const correctAnswerIndex =result.correctAnswer.startsWith('0')
//            ? parseInt(result.correctAnswer.substring(1)) - 1
//            : result.options.findIndex(opt => opt === result.correctAnswer)
//            const isCorrect = result.isCorrect
//            return (
//             <div 
//             key={index}
//             className="">
//               <div className="">
//                 <div className="">
//                   <div className="">
//                     <span className=''>
//                       Question {index + 1}
//                     </span>
//                   </div>
//                   <h4 className=''>
//                     {result.question}
//                   </h4>
//                 </div>
//                 <div className={`shrink-0 w-10 rounded-xl flex items-center justify-center ${
//                   isCorrect
//                   ? 'bg-emerald-50 border-emerald-200'
//                   : 'bg-rose-50 border-2 border-rose-200'
//                 }`}>
//                   {isCorrect ? (
//                     <CheckCircle2 className='' strokeWidth={2.5} />
//                   ) : (
//                     <XCircle className='' strokeWidth={2.5} />
//                   )}
//                 </div>
//               </div>

//               <div className=''>
//                 {result.options.map((option,optIndex) => {
//                   const isCorrectOption = optIndex === correctAnswerIndex
//                   const isUserAnswer = optIndex === userAnswerIndex
//                   const isWrongAnswer = isUserAnswer && !isCorrect

//                   return (
//                     <div
//                     key={optIndex}
//                     className={`relative px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
//                       isCorrectOption
//                       ? 'bg-emerald-50 bo-emerald-300 shadow-lg shadow-emerald-500/20'
//                       : isWrongAnswer
//                       ? 'bg-rose-50 border-rose-300'
//                       : 'bg-slate-50 border-slate-200'
//                     }`}>
//                       <div className="">
//                         <span className={`text-sm font-medium ${
//                           isCorrectOption
//                           ? 'text-emerald-900'
//                           :isWrongAnswer
//                           ?'text-rose-900'
//                           :'text-slate-700'
//                         }`}>
//                           {option}
//                         </span>
//                         <div className="">
//                           {isCorrectOption && (
//                             <span className=''>
//                               <CheckCircle2 className='' strokeWidth={2.5} />
//                               Correct
//                             </span>
//                           )}
//                           {isWrongAnswer && (
//                             <span className=''>
//                               <XCircle className='' strokeWidth={2.5} />
//                               Your Answer
//                             </span>
//                           )}
//                         </div>

//                         {/*EXplanation */}
//                         {result.explanation && (
//                           <div className=''>
//                             <div className=''>
//                               <div className=''>
//                                 <BookOpen className='' strokeWidth={2}/>
//                               </div>
//                               <div className=''>
//                                 <p className=''>
//                                   Explanation
//                                 </p>
//                                 <p className=''>
//                                   {result.explanation}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//            )
//         })}
//       </div>
//     </div>
//   )
// }

// export default QuizResultPage

// import React,{useState,useEffect} from 'react'
// import { useParams,Link } from 'react-router-dom'
// import quizService from '../../services/quizService'
// import PageHeader from '../../components/common/PageHeader'
// import Spinner from '../../components/common/Spinner'
// import toast from 'react-hot-toast'
// import { ArrowLeft,CheckCircle2,XCircle,Trophy,Target,BookOpen } from 'lucide-react'

// const QuizResultPage = () => {

//   const {quizId} = useParams()

//   const [results,setResults] = useState(null)
//   const [loading,setLoading] = useState(true)

//   useEffect(()=>{

//     const fetchResults = async()=>{

//       try{

//         const data = await quizService.getQuizResults(quizId)
//         setResults(data)

//       }catch(error){
//         toast.error("Failed to fetch quiz results")
//       }finally{
//         setLoading(false)
//       }

//     }

//     fetchResults()

//   },[quizId])

//   if(loading){
//     return(
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Spinner/>
//       </div>
//     )
//   }

//   if(!results || !results.data){
//     return(
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <p className="text-lg text-slate-600">
//           Quiz results not found
//         </p>
//       </div>
//     )
//   }

//   const { data:{quiz,results:detailedResults} } = results

//   const score = quiz.score
//   const totalQuestion = detailedResults.length
//   const correctAnswer = detailedResults.filter(r=>r.isCorrect).length
//   const incorrectAnswer = totalQuestion - correctAnswer

//   const getScoreColor = (score)=>{
//     if(score >= 80) return 'from-emerald-500 to-teal-500'
//     if(score >= 60) return 'from-amber-500 to-orange-500'
//     return 'from-rose-500 to-red-500'
//   }

//   const getScoreMessage = (score)=>{
//     if(score >= 90) return 'Outstanding!'
//     if(score >= 80) return 'Great job!'
//     if(score >= 70) return 'Good work!'
//     if(score >= 60) return 'Not bad!'
//     return 'Keep practicing!'
//   }

//   return(

//     <div className="max-w-5xl mx-auto space-y-8">

//       {/* Back Button */}
//       <Link
//         to={`/documents/${quiz.document._id}`}
//         className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
//       >
//         <ArrowLeft className="w-4 h-4"/>
//         Back to Document
//       </Link>

//       <PageHeader title={`${quiz.title || 'Quiz'} Results`} />

//       {/* Score Card */}
//       <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8">

//         <div className="flex flex-col md:flex-row items-center gap-6">

//           <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100">
//             <Trophy className="text-amber-500 w-8 h-8"/>
//           </div>

//           <div className="text-center md:text-left">

//             <p className="text-sm text-slate-500">
//               Your Score
//             </p>

//             <div className={`text-5xl font-bold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
//               {score}%
//             </div>

//             <p className="text-slate-600 mt-1">
//               {getScoreMessage(score)}
//             </p>

//           </div>

//           <div className="grid grid-cols-3 gap-4 md:ml-auto">

//             <div className="bg-slate-50 rounded-xl p-4 text-center">
//               <Target className="w-5 h-5 mx-auto text-slate-500"/>
//               <p className="text-xs text-slate-500">Total</p>
//               <p className="font-semibold">{totalQuestion}</p>
//             </div>

//             <div className="bg-emerald-50 rounded-xl p-4 text-center">
//               <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500"/>
//               <p className="text-xs text-emerald-600">Correct</p>
//               <p className="font-semibold text-emerald-600">{correctAnswer}</p>
//             </div>

//             <div className="bg-rose-50 rounded-xl p-4 text-center">
//               <XCircle className="w-5 h-5 mx-auto text-rose-500"/>
//               <p className="text-xs text-rose-600">Incorrect</p>
//               <p className="font-semibold text-rose-600">{incorrectAnswer}</p>
//             </div>

//           </div>

//         </div>

//       </div>


//       {/* Detailed Review */}
//       <div className="space-y-6">

//         <div className="flex items-center gap-2 text-slate-700 font-semibold">
//           <BookOpen className="w-5 h-5"/>
//           Detailed Review
//         </div>


//         {detailedResults.map((result,index)=>{

//           const userAnswerIndex = result.options.findIndex(
//             opt => opt === result.selectedAnswer
//           )

//           const correctAnswerIndex =
//             result.options.findIndex(opt => opt === result.correctAnswer)

//           const isCorrect = result.isCorrect

//           return(

//             <div
//               key={index}
//               className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm"
//             >

//               {/* Question */}
//               <div className="flex justify-between items-start mb-4">

//                 <div>
//                   <p className="text-xs text-slate-500 mb-1">
//                     Question {index+1}
//                   </p>

//                   <h4 className="font-semibold text-slate-800">
//                     {result.question}
//                   </h4>
//                 </div>

//                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
//                   isCorrect
//                   ? "bg-emerald-100"
//                   : "bg-rose-100"
//                 }`}>
//                   {isCorrect
//                     ? <CheckCircle2 className="text-emerald-600"/>
//                     : <XCircle className="text-rose-600"/>}
//                 </div>

//               </div>


//               {/* Options */}
//               <div className="space-y-3">

//                 {result.options.map((option,optIndex)=>{

//                   const isCorrectOption = optIndex === correctAnswerIndex
//                   const isUserAnswer = optIndex === userAnswerIndex
//                   const isWrongAnswer = isUserAnswer && !isCorrect

//                   return(

//                     <div
//                       key={optIndex}
//                       className={`p-3 rounded-lg border text-sm ${
//                         isCorrectOption
//                           ? "bg-emerald-50 border-emerald-300"
//                           : isWrongAnswer
//                           ? "bg-rose-50 border-rose-300"
//                           : "bg-slate-50 border-slate-200"
//                       }`}
//                     >

//                       <div className="flex justify-between">

//                         <span>{option}</span>

//                         {isCorrectOption && (
//                           <span className="text-emerald-600 text-xs flex items-center gap-1">
//                             <CheckCircle2 className="w-4 h-4"/>
//                             Correct
//                           </span>
//                         )}

//                         {isWrongAnswer && (
//                           <span className="text-rose-600 text-xs flex items-center gap-1">
//                             <XCircle className="w-4 h-4"/>
//                             Your Answer
//                           </span>
//                         )}

//                       </div>

//                     </div>

//                   )

//                 })}


//                 {/* Explanation */}
//                 {result.explanation && (

//                   <div className="mt-4">

//                     <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 bg-blue-50">

//                       <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100">
//                         <BookOpen className="w-4 h-4 text-blue-600"/>
//                       </div>

//                       <div className="flex-1">

//                         <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">
//                           Explanation
//                         </p>

//                         <p className="text-sm text-slate-700 leading-relaxed">
//                           {result.explanation}
//                         </p>

//                       </div>

//                     </div>

//                   </div>

//                 )}

//               </div>

//             </div>

//           )

//         })}

//       </div>

//     </div>

//   )

// }

// export default QuizResultPage


import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import quizService from '../../services/quizService'
import PageHeader from '../../components/common/PageHeader'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'

import {
ArrowLeft,
CheckCircle2,
XCircle,
Trophy,
Target,
BookOpen
} from 'lucide-react'

const QuizResultPage = () => {

const {quizId} = useParams()

const [results,setResults] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchResults = async () => {
try {

const data = await quizService.getQuizResults(quizId)
setResults(data)

} catch(error){

toast.error('Failed to fetch quiz results')
console.error(error)

} finally{
setLoading(false)
}

}

fetchResults()

},[quizId])

if(loading){
return (
<div className="flex justify-center py-20">
<Spinner/>
</div>
)
}

if(!results || !results.data){
return(
<div className="text-center py-20 text-slate-500">
Quiz results not found
</div>
)
}

const {data:{quiz,results:detailedResults}} = results

const score = quiz.score
const totalQuestion = detailedResults.length
const correctAnswer = detailedResults.filter(r=>r.isCorrect).length
const incorrectAnswer = totalQuestion - correctAnswer


const getScoreColor = (score)=>{
if(score>=80) return 'from-emerald-500 to-teal-500'
if(score>=60) return 'from-amber-500 to-orange-500'
return 'from-rose-500 to-red-500'
}

const getScoreMessage = (score)=>{
if(score>=90) return 'Outstanding!'
if(score>=80) return 'Great Job!'
if(score>=70) return 'Good Work'
if(score>=60) return 'Not Bad'
return 'Keep Practicing'
}

return (

<div className="max-w-5xl mx-auto px-4 py-8">

{/* Back Button */}

<Link
to={`/documents/${quiz.document._id}`}
className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6"
>
<ArrowLeft size={18}/>
Back to Document
</Link>

<PageHeader title={`${quiz.title || 'Quiz'} Results`} />

{/* SCORE CARD */}

<div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-10">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

{/* Trophy */}

<div className="flex items-center gap-5">

<div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center">
<Trophy className="text-indigo-600" size={30}/>
</div>

<div>

<p className="text-slate-500 text-sm">Your Score</p>

<div className={`text-5xl font-bold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
{score}%
</div>

<p className="text-slate-600 mt-1">
{getScoreMessage(score)}
</p>

</div>

</div>


{/* Stats */}

<div className="flex gap-6">

<div className="flex items-center gap-2 text-slate-600">
<Target size={18}/>
<span>{totalQuestion} Total</span>
</div>

<div className="flex items-center gap-2 text-emerald-600">
<CheckCircle2 size={18}/>
<span>{correctAnswer} Correct</span>
</div>

<div className="flex items-center gap-2 text-rose-600">
<XCircle size={18}/>
<span>{incorrectAnswer} Incorrect</span>
</div>

</div>

</div>

</div>


{/* QUESTION REVIEW */}

<div>

<div className="flex items-center gap-2 mb-6">

<BookOpen className="text-indigo-600"/>
<h3 className="text-xl font-semibold">
Detailed Review
</h3>

</div>

<div className="space-y-6">

{detailedResults.map((result,index)=>{

const userAnswerIndex =
result.options.findIndex(opt => opt === result.selectedAnswer)

const correctAnswerIndex =
result.correctAnswer.startsWith('0')
? parseInt(result.correctAnswer.substring(1))-1
: result.options.findIndex(opt => opt === result.correctAnswer)

const isCorrect = result.isCorrect

return(

<div
key={index}
className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
>

{/* Question */}

<div className="flex justify-between items-start mb-4">

<div>

<p className="text-sm text-slate-500">
Question {index+1}
</p>

<h4 className="font-medium text-slate-800 mt-1">
{result.question}
</h4>

</div>

<div className={`w-10 h-10 rounded-xl flex items-center justify-center
${isCorrect
?'bg-emerald-50 border border-emerald-200'
:'bg-rose-50 border border-rose-200'
}`}>

{isCorrect
? <CheckCircle2 className="text-emerald-600"/>
: <XCircle className="text-rose-600"/>}

</div>

</div>


{/* Options */}

<div className="space-y-3">

{result.options.map((option,optIndex)=>{

const isCorrectOption = optIndex===correctAnswerIndex
const isUserAnswer = optIndex===userAnswerIndex
const isWrongAnswer = isUserAnswer && !isCorrect

return(

<div
key={optIndex}
className={`px-4 py-3 rounded-lg border transition-all

${isCorrectOption
? 'bg-emerald-50 border-emerald-300'
: isWrongAnswer
? 'bg-rose-50 border-rose-300'
: 'bg-slate-50 border-slate-200'
}
`}
>

<div className="flex justify-between items-center">

<span className="text-sm font-medium">
{option}
</span>

<div className="flex gap-2">

{isCorrectOption &&
<span className="text-xs text-emerald-600 flex items-center gap-1">
<CheckCircle2 size={14}/>
Correct
</span>
}

{isWrongAnswer &&
<span className="text-xs text-rose-600 flex items-center gap-1">
<XCircle size={14}/>
Your Answer
</span>
}

</div>

</div>

</div>

)

})}

</div>


{/* Explanation */}

{result.explanation && (

<div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">

<p className="text-sm font-medium text-indigo-700 mb-1">
Explanation
</p>

<p className="text-sm text-slate-700">
{result.explanation}
</p>

</div>

)}

</div>

)

})}

</div>

</div>
{/*Active Button */}
<div className="mt-8 flex justify-center">
  <Link to={`/documents/${quiz.document._id}`}>
  <button className='group relative px-8 h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 overflow-hidden'>
  <span className='relative z-10 flex items-center gap-2'>
    <ArrowLeft className='w-4 h-4 group-hover:-translate-x-l transition-transform duration-200' strokeWidth={2.5} />
    Return to Document
  </span>
  <div className='absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700'/>
  </button>
  </Link>
</div>
</div>

)

}

export default QuizResultPage