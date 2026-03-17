import React,{useState,useEffect} from 'react'
import {Plus,Trash2} from 'lucide-react'
import toast from 'react-hot-toast'

import quizService from '../../services/quizService'
import aiService from '../../services/aiService'
import Spinner from '../common/Spinner'
import Button from '../common/Button'
import Modal from '../common/Modal'
import QuizCard from './QuizCard'
import EmptyState from '../common/EmptyState'


const QuizManager = ({documentId}) => {
    const [quizzes,setQuizzes] = useState([])
    const [loading,setLoading] = useState(true)
    const[generating,setGenerating] = useState(false)
    const[isGenerateModeOpen,setIsGenerateModeOpen] = useState(false)
    const[numQuestions,setNumQuestion] = useState(5)

    const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
    const[deleting,setDeleting] = useState(false)
    const[selectedQuiz,setSelectedQuiz] = useState(null)
    


    const fetchQuizzes = async () => {
        setLoading(true)
        try {
            const data = await quizService.getQuizzesForDocument(documentId)
            setQuizzes(data.data)
        } catch (error) {
            toast.error('failed to fetch quizzes')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect (() => {
        if(documentId) {
            fetchQuizzes()
        }
    },[documentId])
    const handleGenerateQuiz = async (e) => {
        e.preventDefault()
        setGenerating(true)
        try {
            await aiService.generateQuiz(documentId, {numQuestions})
            toast.success('Quiz generated successfully!')
            setIsGenerateModeOpen(false)
            fetchQuizzes()
        } catch (error) {
            toast.error(error.message ||'Failed to generate quiz.')
        } finally {
            setGenerating(false)
        }
    }

    const handleDeleteRequest = (quiz) => {
        setSelectedQuiz(quiz)
        setIsDeleteModalOpen(true)
    }
    
     const handleConfirmDelete = async () => {
      if (!selectedQuiz) return;
      setDeleting(true)
      try {
        await quizService.deleteQuiz(selectedQuiz._id)
        toast.success(`'${selectedQuiz.title || 'Quiz'}' deleted.`)
        setIsDeleteModalOpen(false)
        setSelectedQuiz(null)
        setQuizzes(quizzes.filter(q => q._id !== selectedQuiz._id))
      } catch (error) {
        toast.error(error.message || 'Failed to delete quiz')
      } finally {
        setDeleting(false)
      }
     }
    const renderQuizContent = () => {
        if(loading){
            return <Spinner/>
        }
        if(quizzes.length === 0) {
            return (
                <EmptyState
                title="No Quizzes Yet"
                description="Generate a quiz from your document to text your knowledge"
                />
            )
        }
        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {quizzes.map((quiz) => (
                   <QuizCard key={quiz._id} quiz={quiz} onDelete={handleDeleteRequest}/> 
                ))}
            </div>
        )
    }
  return (
    <div className='bg-white border border-neutral-200 rounded-lg p-6'>
        <div className='flex justify-end gap-2 mb-4'>
            <Button onClick={() => setIsGenerateModeOpen(true)}>
                <Plus size={16}/>
                Generate Quiz
            </Button>
        </div>
        {renderQuizContent()}

        {/*Generate quiz */}
        {/* <Modal
        isOpen={isGenerateModeOpen}
        onClose={() => setIsGenerateModeOpen(false)}
        title="Generate new quiz">
            <form onSubmit={handleGenerateQuiz} className=''>
                <div>
                    <label className=''>
                        Number of question
                    </label>
                    <input
                    type='number'
                    value={numQuestions}
                    onChange={(e) => setNumQuestion(Math.max(1, parseInt(e.target.value) || 1))}
                    min='1'
                    required
                    className=''
                    />
                </div>
                <div className=''>
                    <Button
                    type="button"
                    variant='secondary'
                    onClick={() => setIsGenerateModeOpen(false)}
                    disable={generating}>
                        Cancel
                    </Button>
                    <Button type='submit' disable={generating}>
                        {generating ? 'Generating...':'Generate'}
                    </Button>
                </div>
            </form>
        </Modal> */}
        <Modal
  isOpen={isGenerateModeOpen}
  onClose={() => setIsGenerateModeOpen(false)}
  title="Generate New Quiz"
>
  <form
    onSubmit={handleGenerateQuiz}
    className="space-y-6"
  >

    {/* Input Section */}
    <div className="space-y-2">

      <label className="block text-sm font-medium text-slate-700">
        Number of Questions
      </label>

      <input
        type="number"
        value={numQuestions}
        onChange={(e) =>
          setNumQuestion(
            Math.max(1, parseInt(e.target.value) || 1)
          )
        }
        min="1"
        required
        className="
          w-full
          h-11
          px-4
          rounded-xl
          border border-slate-300
          bg-white
          text-sm text-slate-800
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/40
          focus:border-indigo-500
          transition-all duration-200
        "
      />

      <p className="text-xs text-slate-500">
        Choose how many questions you want to generate.
      </p>

    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">

      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsGenerateModeOpen(false)}
        disabled={generating}
        className="
          w-full sm:w-auto
          h-10
          rounded-xl
        "
      >
        Cancel
      </Button>

      <Button
        type="submit"
        disabled={generating}
        className="
          w-full sm:w-auto
          h-10
          rounded-xl
          text-white
          bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
          hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700
          shadow-lg shadow-indigo-500/25
          hover:shadow-xl hover:shadow-indigo-500/40
          transition-all duration-300
          active:scale-95
        "
      >
        {generating ? "Generating..." : "Generate"}
      </Button>

    </div>

  </form>
</Modal>
   {/*Delete Confirmation */}
   {/* <Modal
   isOpen={true}
   onClose={() => setIsDeleteModalOpen(false)}
   title="Confirm delete Quiz">
    <div className=''>
      <p className=''>
        Are you sure you want to delete the quiz: <span className=''>{selectedQuiz?.title || 'this quiz'}</span> ? This action cannot be undone.
      </p>
      <div className=''>
        <Button
        type='button'
        variant='outline'
        onClick={() => setIsDeleteModalOpen(false)}
        disable={deleting}>
          Cancel
        </Button>
        <Button
        onClick={handleConfirmDelete}
        disable={deleting}
        className=''>
          {deleting ? 'Deleting...':'Delete'}
        </Button>
      </div>
    </div>
   </Modal> */}
   <Modal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  title="Confirm Delete Quiz"
>
  <div className="space-y-6">

    {/* Message */}
    <p className="text-sm text-slate-600 leading-relaxed">
      Are you sure you want to delete the quiz:{" "}
      <span className="font-semibold text-slate-900">
        {selectedQuiz?.title || "this quiz"}
      </span>
      ? This action cannot be undone.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-end gap-3">

      <Button
        type="button"
        variant="outline"
        onClick={() => setIsDeleteModalOpen(false)}
        disabled={deleting}
        className="w-full sm:w-auto h-10 rounded-xl"
      >
        Cancel
      </Button>

      <Button
        onClick={handleConfirmDelete}
        disabled={deleting}
        className="
          w-full sm:w-auto
          h-10
          rounded-xl
          text-white
          bg-gradient-to-r from-rose-500 to-red-600
          hover:from-rose-600 hover:to-red-700
          shadow-lg shadow-rose-500/25
          hover:shadow-xl hover:shadow-rose-500/40
          transition-all duration-300
          active:scale-95
        "
      >
        {deleting ? "Deleting..." : "Delete"}
      </Button>

    </div>

  </div>
</Modal>
      
    </div>
  )
}

export default QuizManager
