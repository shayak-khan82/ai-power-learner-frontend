// // // import React,{useState,useEffect} from 'react'
// // // import {Plus,Upload,Trash2,FileText,X} from "lucide-react"
// // // import toast from 'react-hot-toast'

// // // import documnetService from "../../services/documentService"
// // // import Spinner from '../../components/common/Spinner'
// // // import Button from '../../components/common/Button'
// // // const DocumentListPage = () => {

// // //   const [documents,setDocuments] = useState([])
// // //   const [loading,setLoading] = useState(true)

// // //   //State for upload model

// // //   const[isUploadModel,setIsUploadModalOpen] = useState(false)
// // //   const[uploadFile,setUploadFile] = useState(null)
// // //   const[uploadTitle,setUploadTitle] = useState("")
// // //   const[uploading,setUploading] = useState(false)
// // //   //State for delete confirmation  modal
// // //   const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
// // //   const[deleting,setDeleting] = useState(false)
// // //   const[selectedDoc,setSelectedDoc] = useState(null)

// // //   const fetchDocuments = async () => {
// // //     try {
// // //       const data = await documnetService.getDocuments()
// // //       setDocuments(data)
// // //     } catch (error) {
// // //       toast.error("Failed to fetch the documents")
// // //       console.error(error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }
// // //   useEffect(() => {
// // //     fetchDocuments()
// // //   },[])
// // //   const handleFileChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if(file) {
// // //       setUploadFile(file)
// // //       setUploadTitle(file.name.replace(/\.[^/.]+$/,""))
// // //     }
// // //   }
// // //   const handleUpload = async (e) => {
// // //     e.preventDefault()
// // //     if(!uploadFile || !uploadTitle) {
// // //       toast.error("Please provide a title and select a file.")
// // //       return
// // //     }
// // //     setUploading(true)
// // //     const formData = new FormData()
// // //     formData.append("file", uploadFile)
// // //     formData.append("title", uploadTitle)

// // //     try {
// // //       await documnetService.uploadDocument(formData)
// // //       toast.success("Documents uploaded successfully");
// // //       setIsUploadModalOpen(false)
// // //       setUploadFile(null)
// // //       setUploadTitle("")
// // //       setLoading(true)
// // //       fetchDocuments()
// // //     } catch (error) {
// // //       toast.error(error.message || "Upload failed.")
// // //     } finally {
// // //       setUploading(false)
// // //     }
// // //   }
// // //   const handleDeleteRequest = (doc) => {
// // //     setSelectedDoc(doc)
// // //     setIsDeleteModalOpen(true)
// // //   }
// // //   const handleConfirmDelete = async () => {
// // //     if(!selectedDoc) return
// // //     setDeleting(true)
// // //     try {
// // //       await documnetService.deleteDocuments(selectedDoc._id)
// // //       toast.success(`'${selectedDoc.title}' deleted`)
// // //       setIsDeleteModalOpen(false)
// // //       setSelectedDoc(null)
// // //       // setDocuments(documents.filter((id) => doc._id !== selectedDoc._id))
// // //       setDocuments(documents.filter((doc) => doc._id !== selectedDoc._id))
// // //     } catch (error) {
// // //       toast.error(error.message || "failed to delete document")
// // //     } finally {
// // //       setDeleting(false)
// // //     }
// // //   }

// // //   const renderContent = () => {
// // //     return <div>renderContent</div>
// // //   }
// // //   return (
// // //     <div className='min-h-screen'>
// // //       {/*Subtle background pattern */}
// // //       <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none'>


// // //         <div className="relative max-w-7xl mx-auto">
// // //           {/*Header */}
// // //           <div className='flex items-center justify-between mb-10'>
// // //             <div>
// // //               <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>
// // //                 My Documents
// // //               </h1>
// // //               <p className=''>
// // //                 Manage and organize your learning materials
// // //               </p>
// // //             </div>
// // //             {documents.length > 0 && (
// // //               <Button onClick={() => setIsUploadModalOpen(true)}>
// // //                 <Plus className='' strokeWidth={2.5}/>
// // //                 Upload Document
// // //               </Button>
// // //             )}
// // //           </div>
// // //           {renderContent()}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default DocumentListPage

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { Plus, Upload, Trash2, FileText, X } from "lucide-react";
// // import toast from "react-hot-toast";

// // import documentService from "../../services/documentService";
// // import Spinner from "../../components/common/Spinner";
// // import Button from "../../components/common/Button";

// // const DocumentListPage = () => {
// //   const [documents, setDocuments] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Upload Modal State
// //   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
// //   const [uploadFile, setUploadFile] = useState(null);
// //   const [uploadTitle, setUploadTitle] = useState("");
// //   const [uploading, setUploading] = useState(false);

// //   // Delete Modal State
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [selectedDoc, setSelectedDoc] = useState(null);
// //   const [deleting, setDeleting] = useState(false);

// //   // Fetch Documents
// //   const fetchDocuments = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await documentService.getDocuments();
// //       setDocuments(data || []);
// //     } catch (error) {
// //       toast.error("Failed to fetch documents");
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDocuments();
// //   }, []);

// //   // Handle File Change
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setUploadFile(file);
// //       setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
// //     }
// //   };

// //   // Handle Upload
// //   const handleUpload = async (e) => {
// //     e.preventDefault();

// //     if (!uploadFile || !uploadTitle.trim()) {
// //       toast.error("Please provide a title and select a file.");
// //       return;
// //     }

// //     setUploading(true);

// //     const formData = new FormData();
// //     formData.append("file", uploadFile);
// //     formData.append("title", uploadTitle);

// //     try {
// //       await documentService.uploadDocument(formData);
// //       toast.success("Document uploaded successfully");

// //       setIsUploadModalOpen(false);
// //       setUploadFile(null);
// //       setUploadTitle("");

// //       fetchDocuments();
// //     } catch (error) {
// //       toast.error(error.message || "Upload failed");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   // Delete
// //   const handleDeleteRequest = (doc) => {
// //     setSelectedDoc(doc);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const handleConfirmDelete = async () => {
// //     if (!selectedDoc) return;

// //     setDeleting(true);
// //     try {
// //       await documentService.deleteDocument(selectedDoc._id);

// //       toast.success(`'${selectedDoc.title}' deleted`);

// //       setDocuments((prev) =>
// //         prev.filter((doc) => doc._id !== selectedDoc._id)
// //       );

// //       setIsDeleteModalOpen(false);
// //       setSelectedDoc(null);
// //     } catch (error) {
// //       toast.error(error.message || "Failed to delete document");
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   // Render Content
// //   const renderContent = () => {
// //     if (loading) {
// //       return (
// //         <div className="flex justify-center py-20">
// //           <Spinner />
// //         </div>
// //       );
// //     }

// //     if (documents.length === 0) {
// //       return (
// //         <div className="text-center py-20">
// //           <FileText className="mx-auto mb-4 text-slate-400" size={48} />
// //           <h3 className="text-lg font-medium text-slate-700 mb-2">
// //             No documents yet
// //           </h3>
// //           <p className="text-slate-500 mb-6">
// //             Upload your first learning document to get started
// //           </p>
// //           <Button onClick={() => setIsUploadModalOpen(true)}>
// //             <Plus className="mr-2" size={18} />
// //             Upload Document
// //           </Button>
// //         </div>
// //       );
// //     }

// //     return (
// //       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
// //         {documents.map((doc) => (
// //           <div
// //             key={doc._id}
// //             className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
// //           >
// //             <div className="flex justify-between items-start mb-4">
// //               <FileText className="text-indigo-500" size={28} />
// //               <button
// //                 onClick={() => handleDeleteRequest(doc)}
// //                 className="text-red-500 hover:text-red-700 transition"
// //               >
// //                 <Trash2 size={18} />
// //               </button>
// //             </div>

// //             <h3 className="font-semibold text-slate-800 truncate">
// //               {doc.title}
// //             </h3>
// //             <p className="text-sm text-slate-500 mt-1">
// //               {new Date(doc.createdAt).toLocaleDateString()}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen relative bg-slate-50 p-6">
// //       {/* Background Pattern */}
// //       <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none"></div>

// //       <div className="relative max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex items-center justify-between mb-10">
// //           <div>
// //             <h1 className="text-2xl font-semibold text-slate-900 mb-2">
// //               My Documents
// //             </h1>
// //             <p className="text-slate-600">
// //               Manage and organize your learning materials
// //             </p>
// //           </div>

// //           {documents.length > 0 && (
// //             <Button onClick={() => setIsUploadModalOpen(true)}>
// //               <Plus className="mr-2" size={18} />
// //               Upload Document
// //             </Button>
// //           )}
// //         </div>

// //         {renderContent()}
// //       </div>

      
// //     </div> 
// //   );
// // };

// // export default DocumentListPage;
// import React,{useState,useEffect} from 'react'
// import {Plus,Upload,Trash2,FileText,X} from "lucide-react"
// import toast from 'react-hot-toast'

// import documentService from "../../services/documentService"
// import Spinner from '../../components/common/Spinner'
// import Button from '../../components/common/Button'
// import DocumentCard from '../../components/documents/DocumentCards'

// const DocumentListPage = () => {

//   const [documents,setDocuments] = useState([])
//   const [loading,setLoading] = useState(true)

//   // State for upload modal
//   const [isUploadModal,setIsUploadModalOpen] = useState(false)
//   const [uploadFile,setUploadFile] = useState(null)
//   const [uploadTitle,setUploadTitle] = useState("")
//   const [uploading,setUploading] = useState(false)

//   // State for delete confirmation modal
//   const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
//   const [deleting,setDeleting] = useState(false)
//   const [selectedDoc,setSelectedDoc] = useState(null)

//   const fetchDocuments = async () => {
//     try {
//       const data = await documentService.getDocuments()
//       setDocuments(data)
//     } catch (error) {
//       toast.error("Failed to fetch the documents")
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchDocuments()
//   },[])

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];   // ✅ fixed (files not file)
//     if(file) {
//       setUploadFile(file)
//       setUploadTitle(file.name.replace(/\.[^/.]+$/,""))
//     }
//   }

//   const handleUpload = async (e) => {
//     e.preventDefault()
//     if(!uploadFile || !uploadTitle) {
//       toast.error("Please provide a title and select a file.")
//       return
//     }

//     setUploading(true)

//     const formData = new FormData()
//     formData.append("file", uploadFile)
//     formData.append("title", uploadTitle)

//     try {
//       await documentService.uploadDocument(formData)
//       toast.success("Documents uploaded successfully");
//       setIsUploadModalOpen(false)
//       setUploadFile(null)
//       setUploadTitle("")
//       setLoading(true)
//       fetchDocuments()
//     } catch (error) {
//       toast.error(error.message || "Upload failed.")
//     } finally {
//       setUploading(false)
//     }
//   }

//   const handleDeleteRequest = (doc) => {
//     setSelectedDoc(doc)
//     setIsDeleteModalOpen(true)
//   }

//   const handleConfirmDelete = async () => {
//     if(!selectedDoc) return

//     setDeleting(true)
//     try {
//       await documentService.deleteDocument(selectedDoc._id)  // ✅ fixed name
//       toast.success(`'${selectedDoc.title}' deleted`)
//       setIsDeleteModalOpen(false)
//       setSelectedDoc(null)

//       // ✅ fixed filter logic
//       setDocuments(prev =>
//         prev.filter((doc) => doc._id !== selectedDoc._id)
//       )

//     } catch (error) {
//       toast.error(error.message || "failed to delete document")
//     } finally {
//       setDeleting(false)
//     }
//   }

//   // const renderContent = () => {
//   //   if(loading) {
//   //     return (
//   //       <div className=''>
//   //         <Spinner/>
//   //       </div>
//   //     )
//   //   }

//   //   if(documents.length > 0) {
//   //     return (
//   //       <div className=''>
//   //         <div className=''>
//   //           <div className=''>
//   //             <FileText 
//   //             className=''
//   //             strokeWidth={1.5}
//   //             />
//   //           </div>
//   //           <h3 className=''>
//   //             No Documenst Yet
//   //           </h3>
//   //           <p className=''>
//   //             Get startes by uploading your first PDF document to begin 
//   //             learning.
//   //           </p>
//   //           <button 
//   //           onClick={() => setIsUploadModalOpen(true)}
//   //           className=''
//   //           >
//   //             <Plus className='' strokeWidth={2.5}/>
//   //             Upload Document
//   //           </button>
//   //         </div>
//   //       </div>
//   //     )
//   //   }

//   //   return (
//   //     <div className=''>
//   //       {documents?.map((doc) => {
//   //         <DocumentCard
//   //         key={doc._id}
//   //         document={doc}
//   //         onDelete={handleDeleteRequest}
//   //         />
//   //       })}
//   //     </div>
//   //   )
//   // }
//   const renderContent = () => {
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <Spinner />
//       </div>
//     );
//   }

//   if (documents.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
//         <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50 mb-6">
//           <FileText className="text-indigo-500" size={28} strokeWidth={1.5} />
//         </div>

//         <h3 className="text-xl font-semibold text-slate-800 mb-2">
//           No Documents Yet
//         </h3>

//         <p className="text-slate-500 max-w-md mb-6">
//           Get started by uploading your first PDF document to begin learning.
//         </p>

//         <button
//           onClick={() => setIsUploadModalOpen(true)}
//           className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
//         >
//           <Plus size={18} strokeWidth={2.5} />
//           Upload Document
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {documents?.map((doc) => (
//         <DocumentCard
//           key={doc._id}
//           document={doc}
//           onDelete={handleDeleteRequest}
//         />
//       ))}
//     </div>
//   );
// };

//   return (
//     <div className='min-h-screen'>
//       {/* Subtle background pattern */}
//       <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none'></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className='flex items-center justify-between mb-10'>
//           <div>
//             <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>
//               My Documents
//             </h1>
//             <p>
//               Manage and organize your learning materials
//             </p>
//           </div>

//           {documents.length > 0 && (
//             <Button onClick={() => setIsUploadModalOpen(true)}>
//               <Plus strokeWidth={2.5}/>
//               Upload Document
//             </Button>
//           )}
//         </div>

//         {/* ✅ fixed function call */}
//         {renderContent()}
//       </div>
//       <div className=''>
//         <div className=''>
//           {/*Close button */}
//           <button
//           onClick={() => setIsUploadModalOpen(false)}
//           className=''>
//             <X className='' strokeWidth={2}/>
//           </button>
//           {/*Modal header */}
//           <div className=''>
//             <h2 className=''>
//               Upload new document
//             </h2>
//             <p className=''>
//               Add a PDF document to your library
//             </p>
//           </div>
//           {/*Form */}
//           <form onSubmit={handleUpload} className=''>
//             {/*Title Input */}
//             <div className=''>
//               <label className=''>
//                 Document Title
//               </label>
//               <input
//               type='text'
//               value={uploadTitle}
//               onChange={(e) => setUploadTitle(e.target.value)}
//               required
//               className=''
//               placeholder='e.g. React Interview prep '/>
//             </div>
//             {/*file uploadc*/}
//             <div className=''>
//               <label className=''>
//                 PDF File
//               </label>
//               <div className=''>
//                 <input
//                 id='file-upload'
//                 type='file'
//                 className=''
//                 onChange={handleFileChange}
//                 />
//                 <div className=''>
//                   <div className=''>
//                     <Upload
//                     className=''
//                     strokeWidth={2}
//                     />
//                   </div>
//                   <p className=''>
//                     {uploadFile ? (
//                       <span className=''>
//                         {uploadFile.name}
//                       </span>
//                     ): (
//                       <>
//                       <span className=''>
//                         Click to upload
//                       </span>{" "}
//                       or drag and drop
//                       </>
//                     )}
//                   </p>
//                   <p className=''>PDF up to 10MB</p>
//                 </div>
//               </div>
//             </div>
//             {/*Active Buttons*/}
//             <div className=''>
//               <button
//               type='button'
//               onClick={() => setIsUploadModalOpen(false)}
//               disabled={uploading}
//               className=''
//               >
//                 Cancel
//               </button>
//               <button
//               type='submit'
//               disabled={uploading}
//               className=''
//               >
//                 {uploading ? (
//                   <span className=''>
//                     <div className=''>
//                       Uploading...
//                     </div>
//                   </span>
//                 ):(
//                   "Upload"
//                 )}
//               </button>

//             </div>
//           </form>
//         </div>

//       </div>
//     </div>
    
    
//   )
  
// }

// export default DocumentListPage


import React, { useState, useEffect } from 'react'
import { Plus, Upload, FileText, X, Trash2 } from "lucide-react"
import toast from 'react-hot-toast'

import documentService from "../../services/documentService"
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import DocumentCard from '../../components/documents/DocumentCards'

const DocumentListPage = () => {

  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  // Upload Modal State
  const [isUploadModal, setIsUploadModalOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploading, setUploading] = useState(false)

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments()
      setDocuments(data || [])
    } catch (error) {
      toast.error("Failed to fetch the documents")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadFile(file)
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""))
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!uploadFile || !uploadTitle.trim()) {
      toast.error("Please provide a title and select a file.")
      return
    }

    setUploading(true)

    const formData = new FormData()
    formData.append("file", uploadFile)
    formData.append("title", uploadTitle)

    try {
      await documentService.uploadDocument(formData)
      toast.success("Document uploaded successfully")

      setIsUploadModalOpen(false)
      setUploadFile(null)
      setUploadTitle("")
      fetchDocuments()

    } catch (error) {
      toast.error(error.message || "Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  // ✅ FIXED DELETE FLOW
  const handleDeleteRequest = (doc) => {
    setSelectedDoc(doc)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedDoc) return

    setDeleting(true)
    try {
      await documentService.deleteDocuments(selectedDoc._id)

      toast.success(`'${selectedDoc.title}' deleted`)

      setDocuments(prev =>
        prev.filter((doc) => doc._id !== selectedDoc._id)
      )

      setIsDeleteModalOpen(false)
      setSelectedDoc(null)

    } catch (error) {
      toast.error(error.message || "Failed to delete document")
    } finally {
      setDeleting(false)
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      )
    }

    if (documents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50 mb-6">
            <FileText className="text-indigo-500" size={28} />
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No Documents Yet
          </h3>

          <p className="text-slate-500 max-w-md mb-6">
            Get started by uploading your first PDF document.
          </p>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Upload Document
          </button>
        </div>
      )
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <DocumentCard
            key={doc._id}
            document={doc}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-slate-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900 mb-2">
              My Documents
            </h1>
            <p className="text-slate-600">
              Manage and organize your learning materials
            </p>
          </div>

          {documents.length > 0 && (
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Plus size={18} />
              Upload Document
            </Button>
          )}
        </div>

        {renderContent()}
      </div>

      {/* UPLOAD MODAL */}
{isUploadModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

      {/* Close Button */}
      <button
        onClick={() => setIsUploadModalOpen(false)}
        className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-1">
          Upload Document
        </h2>
        <p className="text-sm text-slate-500">
          Add a PDF file to your library
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleUpload} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Document Title
          </label>
          <input
            type="text"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g. React Interview Notes"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            PDF File
          </label>

          <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
            <Upload className="text-slate-400 mb-2" size={24} />
            <span className="text-sm text-slate-600">
              {uploadFile ? uploadFile.name : "Click to select a PDF file"}
            </span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(false)}
            disabled={uploading}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={uploading}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

      </form>
    </div>
  </div>
)}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>

              <h2 className="text-xl font-semibold text-slate-800">
                Confirm Deletion
              </h2>
            </div>

            <p className="text-slate-600 text-center mb-8">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                "{selectedDoc?.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleting}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default DocumentListPage