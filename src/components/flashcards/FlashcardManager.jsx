// import React,{useState,useEffect}from 'react'
// import {
//     Plus,
//     ChevronLeft,
//     ChevronRight,
//     Trash2,
//     ArrowLeft,
//     Sparkles,
//     Brain,
// } from "lucide-react"

// import toast from 'react-hot-toast'
// import moment from 'moment'


// import flashcardService from "../../services/flashcardService"
// import aiService from '../../services/aiService'
// import Spinner from '../common/Spinner'
// import Modal from '../common/Modal'
// import Flashcard from './Flashcard'

// const FlashcardManager = ({documentId}) => {

//     const[flashcardSets,setFlashcardSets] = useState([])
//     const [selectedSet,setSelectedSet] = useState(null)
//     const[loading,setLoading] = useState(true)
//     const[generating,setGenerating] = useState(false)
//     const [currentCardIndex,setCurrentCardIndex] = useState(0)
//     const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
//     const [deleting,setDeleting] = useState(false)
//     const[setToDelete,setSetToDelete] = useState(null)


//     const fetchFlashcardSets = async () => {
//         setLoading(true)
//         try {
//             const response = await flashcardService.getFlashcardsForDocument(
//                 documentId
//             )
//             setFlashcardSets(response.data)
//         } catch (error) {
//             toast.error("failed to fetch flashcard sets")
//             console.error(error)
//         } finally {
//             setLoading(false)
//         }
//     }
//     useEffect(() => {
//         if(documentId) {
//             fetchFlashcardSets()
//         }
//     },[documentId])

//     const handleGenerateFlashcards = async () => {
//         setGenerating(true)
//         try {
//             await aiService.generateFlashcards(documentId)
//             toast.success("flashcards generated successfully")
//             fetchFlashcardSets()
//         } catch (error) {
//             toast.error(error.message || "Failed to gnerate flashcards.")
//         } finally {
//             setGenerating(false)
//         }
//     }
//     const handleNextCard = () => {
//         if(selectedSet) {
//             handleReview(currentCardIndex)
//             setCurrentCardIndex(
//                 (prevIndex) => (prevIndex + 1)% selectedSet.cards.length
//             )
//         }
//     }
//     const handlePrevCard = () => {
//         if(selectedSet) {
//             handleReview(currentCardIndex)
//             setCurrentCardIndex(
//                  (prevIndex) =>
//                  (prevIndex - 1 + selectedSet.cards.length) % selectedSet.cards.length
//             )
//         }
//     }

//     const handleReview = async (index) => {
//         const currentCard = selectedSet?.cards[currentCardIndex]
//         if(!currentCard) return

//         try {
//             await flashcardService.reviewFlashcard(currentCard._id,index)
//             toast.success("flashcard reviewes!")
//         } catch (error) {
//             toast.error("failed to review flashcard.")
//         }
//     }

//     const handleToggleStar = async (cardId) => {
//         try {
//             await flashcardService.toggleStar(cardId)
//             const updatedSets = flashcardSets.map((set) => {
//                 if(set._id === selectedSet._id) {
//                     const updatedCards = set.cards.map((card) =>
//                     card._id === cardId? {...card,isStarred: !card.isStarred }: card
//                 )
//                 return {...set,cards:updatedCards}
//                 }
//                 return set;
//             })
//             setFlashcardSets(updatedSets)
//             setSelectedSet(updatedSets.find((set) => set._id === selectedSet._id))
//             toast.success("flashcard starred status updated!")
//         } catch (error) {
//             toast.error("Failed to updata star status.")
            
            
//         }
//     }
//     const handleDeleteRequest = (e,set) => {
//         e.stopPropagation()
//         setSetToDelete(set)
//         setIsDeleteModalOpen(true)    
//     }

//     const handleConfirmDelete = async () => {
//         if(!setToDelete) return
//         setDeleting(true)
//         try {
//             await flashcardService.deleteFlashcardSets(setToDelete._id)
//             toast.success("Flashcard set deleted successfully")
//             setIsDeleteModalOpen(null)
//             fetchFlashcardSets()
//         } catch (error) {
//             toast.error(error.message || "Failed to delete flashcard set.")
//         } finally {
//             setDeleting(false)
//         }
//     }
//     const hanleSelectSet = (set) => {
//         setSelectedSet(set)
//         setCurrentCardIndex(0);
//     }
//     const renderFlashcardViewer = () => {
//         const currentCard = selectedSet.cards[currentCardIndex]

//         // return (
//         //     <div className=''>
//         //         {/*Back Button*/}
//         //         <button
//         //         onClick={() => setSelectedSet(null)}
//         //         className=''
//         //         >
//         //             <ArrowLeft
//         //             className=''
//         //             strokeWidth={2}/>
//         //             Back to Sets
//         //         </button>
//         //         {/*Flashcard Display*/}
//         //         <div className=''>
//         //             <div className=''>
//         //                 <Flashcard
//         //                 flashcard={currentCard}
//         //                 onToggleStar={handleToggleStar}
//         //                 />
//         //             </div>
//         //         </div>
//         //     </div>
//         // )
//         return (
//   <div className="space-y-8">

//     {/* Back Button */}
//     <button
//       onClick={() => setSelectedSet(null)}
//       className="
//       group inline-flex items-center gap-2
//       text-sm font-medium text-gray-600
//       hover:text-gray-900
//       transition-colors duration-200
//       "
//     >
//       <ArrowLeft
//         className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
//         strokeWidth={2}
//       />
//       Back to Sets
//     </button>

//     {/* Flashcard Display Area */}
//     <div className="flex justify-center">

//       <div className="
//         w-full max-w-2xl
//         bg-gradient-to-br from-white to-gray-50
//         border border-gray-200
//         rounded-2xl
//         shadow-lg
//         p-6 sm:p-8
//         transition-all duration-300
//       ">

//         <Flashcard
//           flashcard={currentCard}
//           onToggleStar={handleToggleStar}
//         />

//       </div>
//       {/*Navigation Controls */}
//       {/* <div className=''>
//         <button
//         onClick={handlePrevCard}
//         disabled={selectedSet.cards.length <= 1}
//         className=''>
//             <ChevronLeft
//             className=''
//             strokeWidth={2.5}
//             />
//             Previous
//         </button>
//         <div className=''>
//             <span className=''>
//                 {currentCardIndex + 1}{" "}
//                 <span className=''>/</span>{" "}
//                 {selectedSet.cards.length}
//             </span>
//         </div>
//         <button
//         onClick={handleNextCard}
//         disabled={selectedSet.cards.length <= 1}
//         className=''
//         >
//             Next
//             <ChevronRight
//             className=''
//             strokeWidth={2.5}
//             />
//         </button>
//       </div> */}
//       <div className="flex items-center justify-between mt-8">

//   {/* Previous Button */}
//   <button
//     onClick={handlePrevCard}
//     disabled={selectedSet.cards.length <= 1}
//     className="
//     group inline-flex items-center gap-2
//     px-5 h-11
//     rounded-xl border border-gray-300
//     text-sm font-medium text-gray-700
//     hover:bg-gray-100 hover:border-gray-400
//     transition-all duration-200
//     disabled:opacity-50 disabled:cursor-not-allowed
//     "
//   >
//     <ChevronLeft
//       className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
//       strokeWidth={2.5}
//     />
//     Previous
//   </button>

//   {/* Progress Indicator */}
//   <div className="px-5 py-2 rounded-full bg-gray-100 border border-gray-200">
//     <span className="text-sm font-semibold text-gray-700">
//       {currentCardIndex + 1}
//       <span className="mx-1 text-gray-400">/</span>
//       {selectedSet.cards.length}
//     </span>
//   </div>

//   {/* Next Button */}
//   <button
//     onClick={handleNextCard}
//     disabled={selectedSet.cards.length <= 1}
//     className="
//     group inline-flex items-center gap-2
//     px-5 h-11
//     rounded-xl border border-gray-300
//     text-sm font-medium text-gray-700
//     hover:bg-gray-100 hover:border-gray-400
//     transition-all duration-200
//     disabled:opacity-50 disabled:cursor-not-allowed
//     "
//   >
//     Next
//     <ChevronRight
//       className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
//       strokeWidth={2.5}
//     />
//   </button>

// </div>
//     </div>

//   </div>
// );
//  }
//     const renderSetList = () => {
//        if (loading) {
//         return (
//             <div className='flex items-center justify-center py-20'>
//                 <Spinner/>
//             </div>
//         )
//        }
//        if(flashcardSets.length === 0) {
//         return (
//         <div className='flex flex-col items-center justify-center py-16 px-6'>
//             <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 mb-1.5'>
//                 <Brain className='w-8 h-8 text-emerald-600' strokeWidth={2}/>
//             </div>
//             <h3 className='text-xl font-semibold text-slate-900 mb-2'>
//                 No Flashcards Yet
//             </h3>
//             <p className='text-sm text-slate-500 mb-8 text-center max-w-sm'>
//                 Generate flashcards from your documnet to start learning and
//                 reinforce your knowledge.
//             </p>
//             <button
//             onClick={handleGenerateFlashcards}
//             disabled={generating}
//             className="
// group relative inline-flex items-center justify-center gap-2
// px-6 h-12
// bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
// hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600
// text-white font-semibold text-sm tracking-wide
// rounded-xl
// transition-all duration-300 ease-out
// shadow-lg shadow-emerald-500/25
// hover:shadow-xl hover:shadow-emerald-500/40
// hover:-translate-y-0.5
// active:scale-95 active:shadow-md
// disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none
// focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2
// "
//             >
//                 {generating ? (
//                     <>
//                     <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'/>
//                     Generating...
//                     </>
//                 ) : (
//                     <>
//                     <Sparkles className='w-4 h-4' strokeWidth={2}/>
//                     Generate Flashcards
//                     </>
//                 )}
//             </button>
//         </div>
//        )
//        }
//     //    return(
//     //     <div className=''>
//     //         {/*Header with Generate Button */}
//     //         <div className=''>
//     //             <div>
//     //                 <h3 className=''>
//     //                     Your Flashcards Sets
//     //                 </h3>
//     //                 <p className=''>
//     //                     {flashcardSets.length}{" "}
//     //                     {flashcardSets.length === 1 ? "set":"sets"} available
//     //                 </p>
//     //             </div>
//     //             <button
//     //             onClick={handleGenerateFlashcards}
//     //             disabled={generating}
//     //             className=''
//     //             >
//     //                 {generating ? (
//     //                     <>
//     //                     <div className=''/>
//     //                     Generating...
//     //                     </>
//     //                 ): (
//     //                     <>
//     //                     <Plus className='' strokeWidth={2.5}/>
//     //                     Generate New Set
//     //                     </>
//     //                 )}
//     //             </button>
//     //         </div>
//     //         {/*Flashcard Sets Grid */}
//     //         <div className=''>
//     //             {flashcardSets.map((set) => (
//     //                 <div
//     //                 key={set._id}
//     //                 onClick={() => hanleSelectSet(set)}
//     //                 className=''
//     //                 >
//     //                     {/*Delete Button */}
//     //                     <button
//     //                     onClick={(e) => handleDeleteRequest(e,set)}
//     //                     className=''
//     //                     >
//     //                         <Trash2 className='' strokeWidth={2}/>
//     //                     </button>
//     //                     {/*Set Content*/}
//     //                     <div className=''>
//     //                         <div className=''>
//     //                             <Brain className='' strokeWidth={2}/>
//     //                         </div>
//     //                         <div>
//     //                             <h4 className=''>
//     //                                 Flashcard Set
//     //                             </h4>
//     //                             <p className=''>
//     //                                 Created {moment(set.createdAt).format("MMM D, YYYY")}
//     //                             </p>
//     //                         </div>
//     //                         <div className=''>
//     //                             <div className=''>
//     //                                 <span className=''>
//     //                                     {set.cards.length}{" "}
//     //                                     {set.cards.length === 1 ? "card":"cards"}
//     //                                 </span>
//     //                             </div>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             ))}
//     //         </div>
//     //     </div>
//     //    )
//     return (
//   <div className="space-y-8">

//     {/* Header */}
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//       <div>
//         <h3 className="text-2xl font-bold text-gray-800">
//           Your Flashcard Sets
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">
//           {flashcardSets.length}{" "}
//           {flashcardSets.length === 1 ? "set" : "sets"} available
//         </p>
//       </div>

//       <button
//         onClick={handleGenerateFlashcards}
//         disabled={generating}
//         className="
//         group relative inline-flex items-center justify-center gap-2
//         px-6 h-12
//         bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
//         hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600
//         text-white font-semibold text-sm tracking-wide
//         rounded-xl
//         transition-all duration-300 ease-out
//         shadow-lg shadow-emerald-500/25
//         hover:shadow-xl hover:shadow-emerald-500/40
//         hover:-translate-y-0.5
//         active:scale-95
//         disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
//         "
//       >
//         {generating ? (
//           <>
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             Generating...
//           </>
//         ) : (
//           <>
//             <Plus className="w-4 h-4" strokeWidth={2.5} />
//             Generate New Set
//           </>
//         )}
//       </button>

//     </div>

//     {/* Flashcard Grid */}
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

//       {flashcardSets.map((set) => (
//         <div
//           key={set._id}
//           onClick={() => hanleSelectSet(set)}
//           className="
//           group relative bg-white rounded-2xl border border-gray-200
//           shadow-md hover:shadow-xl
//           transition-all duration-300
//           hover:-translate-y-1
//           cursor-pointer p-6
//           "
//         >

//           {/* Delete Button */}
//           <button
//             onClick={(e) => handleDeleteRequest(e, set)}
//             className="
//             absolute top-4 right-4
//             w-9 h-9 flex items-center justify-center
//             rounded-lg bg-red-50 text-red-500
//             hover:bg-red-100 hover:text-red-600
//             transition-colors duration-200
//             "
//           >
//             <Trash2 className="w-4 h-4" strokeWidth={2} />
//           </button>

//           {/* Card Content */}
//           <div className="flex items-start gap-4">

//             {/* Icon */}
//             <div className="
//               w-12 h-12 flex items-center justify-center
//               rounded-xl
//               bg-gradient-to-br from-indigo-500 to-purple-600
//               text-white shadow-md
//               ">
//               <Brain className="w-6 h-6" strokeWidth={2} />
//             </div>

//             {/* Text Content */}
//             <div className="flex-1">

//               <h4 className="text-lg font-semibold text-gray-800">
//                 Flashcard Set
//               </h4>

//               <p className="text-sm text-gray-500 mt-1">
//                 Created {moment(set.createdAt).format("MMM D, YYYY")}
//               </p>

//               {/* Card Count Badge */}
//               <div className="mt-4">
//                 <span className="
//                   inline-flex items-center px-3 py-1
//                   text-xs font-medium
//                   bg-indigo-50 text-indigo-600
//                   rounded-full
//                 ">
//                   {set.cards.length}{" "}
//                   {set.cards.length === 1 ? "card" : "cards"}
//                 </span>
//               </div>

//             </div>

//           </div>

//         </div>
//       ))}

//     </div>

//   </div>
// );
//     }
//   return (
//     <>
//     <div className='bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-8'>
//         {selectedSet ? renderFlashcardViewer() : renderSetList()}

//     </div>
//     {/*Delete Confirmation Modal */}
//     {/* <Modal 
//     isOpen={isDeleteModalOpen}
//     onClose={() => setIsDeleteModalOpen(false)}
//     title="Delete Flashcard Sets?">
//         <div className=''>
//             <p className=''>
//                 Are you sure you want to delete this flashcard set? This action
//                 cannot br undone and all cards will be permanently removed.
//             </p>
//             <div className=''>
//                 <button
//                 type="button"
//                 onClick={() => setIsDeleteModalOpen(false)}
//                 disabled={deleting}
//                 className=''
//                 >
//                     Cancel
//                 </button>
//                 <button
//                 onClick={handleConfirmDelete}
//                 disabled={deleting}
//                 className=''
//                 >
//                     {deleting ? (
//                         <span className=''>
//                             <div className=''/>
//                                 Deleting...
//                         </span>
//                     ) : (
//                         "Delete Set"
//                     )}
//                 </button>
//             </div>
//         </div>
//     </Modal> */}
//     <Modal
//   isOpen={isDeleteModalOpen}
//   onClose={() => setIsDeleteModalOpen(false)}
//   title="Delete Flashcard Set?"
// >
//   <div className="space-y-6">

//     {/* Warning Section */}
//     <div className="flex items-start gap-4 bg-red-50 border border-red-100 rounded-xl p-4">

//       <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
//         <Trash2 className="w-5 h-5" strokeWidth={2} />
//       </div>

//       <p className="text-sm text-red-700 leading-relaxed">
//         Are you sure you want to delete this flashcard set? This action
//         cannot be undone and all cards will be permanently removed.
//       </p>

//     </div>

//     {/* Action Buttons */}
//     <div className="flex justify-end gap-3">

//       {/* Cancel Button */}
//       <button
//         type="button"
//         onClick={() => setIsDeleteModalOpen(false)}
//         disabled={deleting}
//         className="
//         px-5 h-11 rounded-xl text-sm font-medium
//         border border-gray-300 text-gray-700
//         hover:bg-gray-100
//         transition-all duration-200
//         disabled:opacity-50 disabled:cursor-not-allowed
//         "
//       >
//         Cancel
//       </button>

//       {/* Delete Button */}
//       <button
//         onClick={handleConfirmDelete}
//         disabled={deleting}
//         className="
//         inline-flex items-center justify-center gap-2
//         px-5 h-11 rounded-xl text-sm font-semibold
//         bg-gradient-to-r from-red-500 to-rose-500
//         hover:from-red-600 hover:to-rose-600
//         text-white
//         transition-all duration-300
//         shadow-lg shadow-red-500/25
//         hover:shadow-xl hover:shadow-red-500/40
//         active:scale-95
//         disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
//         "
//       >
//         {deleting ? (
//           <>
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             Deleting...
//           </>
//         ) : (
//           "Delete Set"
//         )}
//       </button>

//     </div>

//   </div>
// </Modal>
//     </>
//   )
// }

// export default FlashcardManager


import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ArrowLeft,
  Brain,
} from "lucide-react";

import toast from "react-hot-toast";
import moment from "moment";

import flashcardService from "../../services/flashcardService";
import aiService from "../../services/aiService";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import Flashcard from "./Flashcard";

const FlashcardManager = ({ documentId }) => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [setToDelete, setSetToDelete] = useState(null);

  useEffect(() => {
    if (documentId) fetchFlashcardSets();
  }, [documentId]);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    try {
      const res = await flashcardService.getFlashcardsForDocument(documentId);
      setFlashcardSets(res.data);
    } catch {
      toast.error("Failed to fetch flashcards");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      await aiService.generateFlashcards(documentId);
      toast.success("Flashcards generated");
      fetchFlashcardSets();
    } catch {
      toast.error("Failed to generate flashcards");
    } finally {
      setGenerating(false);
    }
  };

  const handleNextCard = () =>
    setCurrentCardIndex(
      (prev) => (prev + 1) % selectedSet.cards.length
    );

  const handlePrevCard = () =>
    setCurrentCardIndex(
      (prev) =>
        (prev - 1 + selectedSet.cards.length) %
        selectedSet.cards.length
    );

  const handleToggleStar = async (cardId) => {
    try {
      await flashcardService.toggleStar(cardId);

      const updatedSets = flashcardSets.map((set) => {
        if (set._id === selectedSet._id) {
          const updatedCards = set.cards.map((card) =>
            card._id === cardId
              ? { ...card, isStarred: !card.isStarred }
              : card
          );
          return { ...set, cards: updatedCards };
        }
        return set;
      });

      setFlashcardSets(updatedSets);
      setSelectedSet(
        updatedSets.find((s) => s._id === selectedSet._id)
      );
    } catch {
      toast.error("Failed to update star");
    }
  };

  const handleDeleteRequest = (e, set) => {
    e.stopPropagation();
    setSetToDelete(set);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!setToDelete) return;
    setDeleting(true);
    try {
      await flashcardService.deleteFlashcardSets(setToDelete._id);
      toast.success("Set deleted");
      setIsDeleteModalOpen(false);
      fetchFlashcardSets();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleSelectSet = (set) => {
    setSelectedSet(set);
    setCurrentCardIndex(0);
  };

  /* ================= VIEWER ================= */

  const renderFlashcardViewer = () => {
    const currentCard = selectedSet.cards[currentCardIndex];

    return (
      <div className="space-y-6">

        <button
          onClick={() => setSelectedSet(null)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition"
            strokeWidth={2}
          />
          Back to Sets
        </button>

        <div className="flex justify-center">
          <Flashcard
            flashcard={currentCard}
            onToggleStar={handleToggleStar}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <button
            onClick={handlePrevCard}
            className="w-full sm:w-auto px-5 h-10 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            <ChevronLeft className="w-4 h-4 inline mr-1" />
            Previous
          </button>

          <div className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold">
            {currentCardIndex + 1} / {selectedSet.cards.length}
          </div>

          <button
            onClick={handleNextCard}
            className="w-full sm:w-auto px-5 h-10 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Next
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>

        </div>
      </div>
    );
  };

  /* ================= SET LIST ================= */

  const renderSetList = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      );
    }

    if (flashcardSets.length === 0) {
      return (
        <div className="flex flex-col items-center py-16 text-center">
          <Brain className="w-12 h-12 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">
            No Flashcards Yet
          </h3>
          <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm">
            Generate flashcards to start learning smarter.
          </p>

          <button
            onClick={handleGenerateFlashcards}
            className="px-6 h-11 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition"
          >
            {generating ? "Generating..." : "Generate Flashcards"}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Your Flashcard Sets
            </h3>
            <p className="text-sm text-slate-500">
              {flashcardSets.length} sets available
            </p>
          </div>

          <button
            onClick={handleGenerateFlashcards}
            className="px-5 h-10 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 shadow-md hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Generate New
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {flashcardSets.map((set) => (
            <div
              key={set._id}
              onClick={() => handleSelectSet(set)}
              className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
            >
              <button
                onClick={(e) => handleDeleteRequest(e, set)}
                className="absolute top-4 right-4 text-rose-500 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md mb-4">
                <Brain className="w-6 h-6" />
              </div>

              <h4 className="font-semibold text-slate-800">
                Flashcard Set
              </h4>

              <p className="text-xs text-slate-500 mt-1">
                {moment(set.createdAt).format("MMM D, YYYY")}
              </p>

              <div className="mt-4 text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full inline-block">
                {set.cards.length} cards
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  };

  /* ================= MAIN ================= */

  return (
    <>
      <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        {selectedSet ? renderFlashcardViewer() : renderSetList()}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Flashcard Set?"
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            This action cannot be undone.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button className="px-5 h-10 border rounded-xl">
              Cancel
            </button>

            <button
              onClick={handleConfirmDelete}
              className="px-5 h-10 rounded-xl text-white font-semibold bg-gradient-to-r from-rose-500 to-red-600 shadow-lg shadow-rose-500/25"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FlashcardManager;