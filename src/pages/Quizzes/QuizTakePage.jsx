import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { ChevronLeft,ChevronRight,CheckCircle2 } from 'lucide-react'
import quizService from '../../services/quizService'
import PageHeader from'../../components/common/PageHeader'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'


const  QuizTakePage = () => {
  const {quizId} = useParams()
  const navigate = useNavigate()
  const [quiz,setQuiz] = useState(null)
  const [loading,setLoading] = useState(true)
  const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers,setSelectedAnswers] = useState({})
  const [submitting,setSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuiz = async() => {
      try {
        const response = await quizService.getQuizById(quizId)
        setQuiz(response.data)
      } catch (error) {
        toast.error("failed to fetch quiz")
        
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  },[quizId])

  const handleOptionChange = (questionId,optionIndex) => {
    setSelectedAnswers((prev) => ( {
      ...prev,
      [questionId]:optionIndex,
    }))
  }

  const handleNextQuestion = () => {
    if(currentQuestionIndex < quiz.questions.length - 1){
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }
  const handlePreviousQuestion = () => {
    if(currentQuestionIndex > 0){
      setCurrentQuestionIndex((prev) => prev-1)
    }
  }
  // const handleSubmitQuit = async () => {
  //   setSubmitting(true)
  //   try {
  //     const formattedAnswers = Object.keys(selectedAnswers).map(questionId => {
  //       const question = quiz.questions.find(q => q._id === questionId)
  //       const questionIndex = quiz.questions.findIndex(q => q._id === questionId)
  //       const optionIndex = selectedAnswers[questionId]
  //       const selectedAnswer = question.options[optionIndex]
  //       return {questionIndex,selectedAnswer}
  //     })
  //     await quizService.submitQuiz(quizId,formattedAnswers)
  //     toast.success('Quiz submitted successfully')
  //     navigate(`/quizzes/${quizId}/results`)
  //   } catch (error) {
  //     toast.error(error.message || 'Failed to submit quiz.')
  //   } finally {
  //     setSubmitting(false)
  //   }
  // }
  const handleSubmitQuit = async () => {

  if(Object.keys(selectedAnswers).length !== quiz.questions.length){
    toast.error("Please answer all questions")
    return
  }

  setSubmitting(true)

  try {

    const formattedAnswers = Object.keys(selectedAnswers).map(questionId => {

      const question = quiz.questions.find(q => q._id === questionId)
      const questionIndex = quiz.questions.findIndex(q => q._id === questionId)
      const optionIndex = selectedAnswers[questionId]

      const selectedAnswer = question.options[optionIndex]

      return {
        questionIndex,
        selectedAnswer
      }

    })

    await quizService.submitQuiz(quizId,{
      answers: formattedAnswers
    })

    toast.success("Quiz submitted successfully")

    navigate(`/quizzes/${quizId}/results`)

  } catch (error) {

    toast.error(error.message || "Failed to submit quiz.")

  } finally {
    setSubmitting(false)
  }

}
  if (loading) {
    return(
      <div className='flex items-center justify-center min-h[60vh]'>
        <Spinner/>
      </div>
    )
  }
  if(!quiz || quiz.questions.length === 0){
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <p className='text-slate-600 text-lg'>Quiz not found or has no question</p>
        </div>
      </div>
    )
  }
  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion._id)
  const answerdCount = Object.keys(selectedAnswers).length

  return(
    // <div className=''>
    //   <PageHeader title={quiz.title || 'Take Quiz'}/>
    //   {/*Progress Bar */}
    //   <div className=''>
    //     <div className=''>
    //       <span className=''>
    //         Question {currentQuestion + 1} of{quiz.questions.length}
    //       </span>
    //       <span className=''>
    //         {answerdCount} answered
    //       </span>
    //     </div>
    //     <div className=''>
    //       <div
    //       className=''
    //       style={{width:`${((currentQuestionIndex + 1) / quiz.questions.length)*100}%`}}></div>
    //     </div>
    //   </div>
    //   {/*Question card */}
    //   <div className="">
    //     <div className="">
    //       <div className="">
    //         <span className=''>
    //           Question {currentQuestionIndex + 1}
    //         </span>
    //       </div>
    //       <h3 className=''>
    //         {currentQuestion.question}
    //       </h3>
    //     </div>
    //   </div>
    // </div>
    <div className="space-y-6">

  {/* Page Header */}
  <PageHeader title={quiz.title || "Take Quiz"} />

  {/* Progress Section */}
  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">

    <div className="flex justify-between text-sm text-slate-600 mb-2">
      <span>
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </span>

      <span>
        {answerdCount} answered
      </span>
    </div>

    {/* Progress Bar */}
    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-300"
        style={{
          width: `${
            ((currentQuestionIndex + 1) / quiz.questions.length) * 100
          }%`,
        }}
      ></div>
    </div>

  </div>

  {/* Question Card */}
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">

    <div className="mb-4">
      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-600">
        Question {currentQuestionIndex + 1}
      </span>
    </div>

    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
      {currentQuestion.question}
    </h3>
    {/*Options */}
    <div className="space-y-3">
  {(currentQuestion?.options || []).map((option, index) => {
    const isSelected = selectedAnswers[currentQuestion._id] === index;

    return (
      <label
        key={index}
        className={`group relative flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
          isSelected
            ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10"
            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white hover:shadow-xl"
        }`}
      >
        <input
          type="radio"
          name={`question-${currentQuestion._id}`}
          value={index}
          checked={isSelected}
          onChange={() =>
            handleOptionChange(currentQuestion._id, index)
          }
          className="sr-only"
        />

        <div
          className={`shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            isSelected
              ? "border-emerald-500 bg-emerald-500"
              : "border-slate-300 bg-white group-hover:border-emerald-400"
          }`}
        >
          {isSelected && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        <span
          className={`ml-4 text-sm font-medium transition-colors duration-200 ${
            isSelected
              ? "text-emerald-900"
              : "text-slate-700 group-hover:text-slate-900"
          }`}
        >
          {option}
        </span>

        {isSelected && (
          <CheckCircle2
            className="ml-auto w-5 h-5 text-emerald-500"
            strokeWidth={2.5}
          />
        )}
      </label>
    );
  })}
</div>

{/*Navigation Button */}
{/* Navigation Buttons */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

  {/* Previous */}
  <Button
    onClick={handlePreviousQuestion}
    disabled={currentQuestionIndex === 0 || submitting}
    variant="secondary"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl"
  >
    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
    Previous
  </Button>

  {/* Next / Submit */}
  {currentQuestionIndex === quiz.questions.length - 1 ? (
    <button
      onClick={handleSubmitQuit}
      disabled={submitting}
      className="
        w-full sm:w-auto
        inline-flex items-center justify-center gap-2
        px-6 h-11
        rounded-xl
        text-sm font-semibold
        text-white
        bg-gradient-to-r from-emerald-500 to-teal-500
        hover:from-emerald-600 hover:to-teal-600
        shadow-lg shadow-emerald-500/25
        hover:shadow-xl hover:shadow-emerald-500/40
        transition-all duration-300
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {submitting ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Submitting...
        </span>
      ) : (
        <>
          <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
          Submit Quiz
        </>
      )}
    </button>
  ) : (
    <Button
      onClick={handleNextQuestion}
      disabled={submitting}
      className="w-full sm:w-auto inline-flex items-center gap-2 px-5 h-11 rounded-xl"
    >
      Next
      <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
    </Button>
  )}

</div>


{/* Question Navigation Dots */}
<div className="flex flex-wrap justify-center gap-2 mt-6">

  {quiz.questions.map((_, index) => {
    const isAnsweredQuestion =
      selectedAnswers.hasOwnProperty(quiz.questions[index]._id);

    const isCurrent = index === currentQuestionIndex;

    return (
      <button
        key={index}
        onClick={() => setCurrentQuestionIndex(index)}
        disabled={submitting}
        className={`
          w-8 h-8
          flex items-center justify-center
          rounded-lg
          text-xs font-semibold
          transition-all duration-200
          ${
            isCurrent
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 scale-105"
              : isAnsweredQuestion
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {index + 1}
      </button>
    );
  })}

</div>
  </div>

</div>
  )
}

export default QuizTakePage