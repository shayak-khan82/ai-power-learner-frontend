import React ,{useState}from 'react'
import { useParams } from 'react-router-dom'
import { Sparkles,BookOpen,Lightbulb } from 'lucide-react'
import aiService from '../../services/aiService'
import toast from 'react-hot-toast'
import MarkdownRenderer from '../common/markdownRenderer'
import Modal from '../common/Modal'

const AIActions = () => {
    const {id: documentId} = useParams()
    const [loadingAction,setLoadingAction] = useState(null)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const[modalContent,setModalContent] = useState("")
    const [modalTitle,setModalTitle] = useState("")
    const [concept,setConcept] = useState("")

    // const handleGenerateSummary = async () => {
    //     setLoadingAction("summary")
    //     try {
    //         const {summary} = await aiService.generateSummary(documentId)
    //         setModalTitle("Generated Summary")
    //         setModalContent(summary)
    //         setIsModalOpen(true)
    //     } catch (error) {
    //         toast.error("failed to generate summary.")
    //     } finally {
    //         setLoadingAction(null)
    //     }
    // }
    const handleGenerateSummary = async () => {
  setLoadingAction("summary")

  try {
    const response = await aiService.generateSummary(documentId)

    console.log("SUMMARY RESPONSE:", response)

    const summary = response.data?.summary   // 🔥 correct path

    if (!summary) {
      toast.error("No summary returned from server")
      return
    }

    setModalTitle("Generated Summary")
    setModalContent(summary)
    setIsModalOpen(true)

  } catch (error) {
    console.error(error)
    toast.error(error.error || "Failed to generate summary.")
  } finally {
    setLoadingAction(null)
  }
}

    // const handleExplainConcept = async (e) => {
    //     e.preventDafault()
    //     if(!concept.trim()) {
    //         toast.error("Please enter a concept to explain")
    //         return
    //     }
    //     setLoadingAction("explain")
    //     try {
    //         const {explanation} = await aiService.explainConcept(
    //             documentId,
    //             concept
    //         )
    //         setModalTitle(`Explanation of "${concept}"`)
    //         setModalContent(explanation)
    //         setIsModalOpen(true)
    //         setConcept("")
    //     } catch (error) {
    //         toast.error("failed to explain concept.")
    //     } finally {
    //         setLoadingAction(null)
    //     }
    // }
    const handleExplainConcept = async (e) => {
  e.preventDefault()

  if (!concept.trim()) {
    toast.error("Please enter a concept to explain")
    return
  }

  setLoadingAction("explain")

  try {
    const response = await aiService.explainConcept(documentId, concept)

    console.log("EXPLAIN RESPONSE:", response)

    const explanation =
      response.data?.explanation || response.explanation

    if (!explanation) {
      toast.error("No explanation returned")
      return
    }

    setModalTitle(`Explanation of "${concept}"`)
    setModalContent(explanation)
    setIsModalOpen(true)
    setConcept("")

  } catch (error) {
    console.error("Explain error:", error)
    toast.error(error.error || "Failed to explain concept.")
  } finally {
    setLoadingAction(null)
  }
}

  return (
    <>
     <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6">

  {/* Header */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
      <Sparkles className="w-6 h-6" strokeWidth={2} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        AI Assistant
      </h3>
      <p className="text-sm text-gray-500">
        Powered by advanced AI technology
      </p>
    </div>
  </div>

  {/* Generated Summary Section */}
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">

    <div className="flex items-start justify-between gap-4">

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <BookOpen className="w-5 h-5" strokeWidth={2} />
          </div>

          <h4 className="text-md font-semibold text-gray-800">
            Generate Summary
          </h4>
        </div>

        <p className="text-sm text-gray-600 max-w-sm">
          Get a concise summary of the entire document.
        </p>
      </div>

      <button
        onClick={handleGenerateSummary}
        disabled={loadingAction === "summary"}
        className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 
        bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
        hover:shadow-lg hover:scale-[1.02] active:scale-95
        disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loadingAction === "summary" ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          "Summarize"
        )}
      </button>

    </div>

  </div>
  {/*EXplain Concept */}
 <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-6">

  <form onSubmit={handleExplainConcept} className="space-y-5">

    {/* Header */}
    <div className="flex items-start gap-4">

      <div className="w-12 h-12 flex items-center justify-center rounded-xl 
        bg-gradient-to-br from-amber-400 to-orange-500 
        text-white shadow-md">
        <Lightbulb className="w-6 h-6" strokeWidth={2} />
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800">
          Explain a Concept
        </h4>
        <p className="text-sm text-gray-500 max-w-md">
          Enter a topic or concept from the document to get a detailed explanation.
        </p>
      </div>

    </div>

    {/* Input + Button */}
    <div className="flex flex-col sm:flex-row gap-3">

      <input
        type="text"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        placeholder="e.g., 'React Hooks'"
        disabled={loadingAction === "explain"}
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
        text-sm transition-all duration-300
        disabled:bg-gray-100 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={loadingAction === "explain" || !concept.trim()}
        className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
        bg-gradient-to-r from-amber-400 to-orange-500 text-white
        hover:shadow-lg hover:scale-[1.02] active:scale-95
        disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center gap-2"
      >
        {loadingAction === "explain" ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          "Explain"
        )}
      </button>

    </div>

  </form>

</div>

</div>
{/*Result Modal*/}
<Modal
isOpen={isModalOpen}
onClose= {() => setIsModalOpen(false)}
title={modalTitle}>
    <div className='max-h-[60vh] overflow-y-auto prose prose-sm max-w-none prose-slate'>
        <MarkdownRenderer content={modalContent} />
    </div>
</Modal>


    </>
  )
}

export default AIActions
