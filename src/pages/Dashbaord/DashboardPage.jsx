// import React,{useEffect,useState} from "react";
// import Spinner from '../../components/common/Spinner'
// import progressService from '../../services/progressService'
// import toast from "react-hot-toast";
// import { FileText,BookOpen,BrainCircuit,TrendingUp,Clock, icons } from "lucide-react";

// const DashboardPage= () => {
//   const[dashboardData,setDashboardData] = useState(null)
//   const [loading,setLoading] = useState(true)

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const data = await progressService.getDashboardData()
//         console.log("Data_getDashboardData", data)

//         setDashboardData(data.data)
//       } catch (error) {
//         toast.error('failed to fetch dashboard data.');
//         console.error(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchDashboardData();
//   },[])
//   if (loading) {
//     return <Spinner/>
//   }
//   if (!dashboardData || !dashboardData.overview) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 mb-4">
//             <TrendingUp className="w-8 h-8 text-slate-400"/>
//           </div>
//           <p className="text-slate-600 text-sm">No dashbaord data available.</p>
//         </div>

//       </div>
//     )
//   }
//   const starts =[
//     {
//       label:'Total Documents',
//       value:dashboardData.overview.totalDocuments,
//       icon:FileText,
//       gradient:'from-blue-400 to-cyan-500',
//       shadowColor:'shadow-purple-500/25'
//     },
//     {
//       label:'Total Flashcards',
//       value:dashboardData.overview.totalFlashcards,
//       icon:BookOpen,
//       gradient:'from-blue-400 to-cyan-500',
//       shadowColor:'shadow-purple-500/25'
//     },
//     {
//       label:'Total Quizzes',
//       value:dashboardData.overview.totalQuizzes,
//       icon:BrainCircuit,
//       gradient:'from-blue-400 to-cyan-500',
//       shadowColor:'shadow-purple-500/25'
//     }
//   ]
//   // return (
//   //   <div className="">
//   //     <div className="">

//   //       <div className="">
//   //         {/*Header */}
//   //         <h1 className="">
//   //           Dashboard
//   //         </h1>
//   //         <p className="">
//   //           Track your learning progress and activity
//   //         </p>
//   //       </div>

//   //       {/*starts grid */}
//   //       <div className="">
//   //         {statusbar.map((stat,index) => (
//   //           <div
//   //           key={index}
//   //           className="">
//   //             <div className="">
//   //               <span className="">
//   //                 {stat.label}
//   //               </span>
//   //               <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
//   //                <stat.icon className="" strokeWidth={2} />
//   //                </div>
//   //             </div>

//   //             <div className="">
//   //               {stat.value}
//   //             </div>
//   //           </div>
//   //         ))}
//   //       </div>
//   //       {/* Recent Activity section*/}
//   //       <div className="">
//   //         <div className="">
//   //           <div className="">
//   //             <Clock className="" strokeWidth={2}/>
//   //           </div>
//   //           <h3 className="">
//   //             Recent Activity
//   //           </h3>
//   //         </div>
//   //         {dashboardData.recentActivity && (dashboardData.recentActivity.documents.length > 0 || dashboardData.recentActivity.quizzes.length >  0) ? (
//   //           <div className="">
//   //             {[
//   //               ...(dashboardData.recentActivity.documents || []).map(doc => ({
//   //                 id: doc._id,
//   //                 description:doc.lastAccessed,
//   //                 timestamp: doc.lastAccessed,
//   //                 link: `/documnets/${quiz._id}`,
//   //                 type:'document'
//   //               })),
//   //               ...(dashboardData.recentActivity.quizzes || []).map(quiz => ({
//   //                  id: quiz._id,
//   //                 description:quiz.lastAccessed,
//   //                 timestamp: quiz.lastAccessed,
//   //                 link: `/quizzes/${quiz._id}`,
//   //                 type:'quiz'
//   //               }))
//   //             ]
//   //              .sort((a,b) => new DataTransfer(b.timestamp) - new DataTransfer(a.timestamp))
//   //              .map((activity,index) => (
//   //               <div 
//   //               key={activity.id || index}
//   //               className=""
//   //               >
//   //                 <div className="">
//   //                   <div className="">
//   //                     <div className={`w-2 h-2 rounded-full ${
//   //                       activity.type === 'document' 
//   //                       ? 'bg-linear-to-r from-blue-400 to-cyan-500'
//   //                       : 'bg-linear-to-r from-emerald-400 to-teal-500' }`} />

//   //                       <p className="">
//   //                         {activity.type === 'document'? 'Accessed Document:': 'Attempted Quiz'}
//   //                         <span className="">{activity.description}</span>
//   //                       </p>
//   //                       </div>
//   //                      <p className="">
//   //                       {new Date(activity.timestamp).toLocaleString()}
//   //                       </p> 
//   //                   </div>
//   //                   {activity.link && (
//   //                     <a href={activity.link} className="">
//   //                       View
//   //                     </a>
//   //                   )}
//   //                   </div>
//   //              ) )
//   //              }
//   //           </div>
//   //         ) : (
//   //           <div className="">
//   //             <div className="">
//   //               <Clock className=""/>
//   //             </div>
//   //             <p className=""> No recent activity yet.</p>
//   //             <p className=""> Start learning to see your progress here.</p>

//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   </div>
//   // )
//   return (
//   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6 md:p-10">
//     <div className="max-w-7xl mx-auto space-y-10">

//       {/* Header */}
//       <div>
//         <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
//           Dashboard
//         </h1>
//         <p className="text-slate-500 mt-2 text-sm md:text-base">
//           Track your learning progress and activity
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-6 md:grid-cols-3">
//         {starts.map((stat, index) => (
//           <div
//             key={index}
//             className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//           >
//             <div className="flex justify-between items-center">
//               <span className="text-slate-500 text-sm font-medium">
//                 {stat.label}
//               </span>

//               <div
//                 className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
//               >
//                 <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
//               </div>
//             </div>

//             <div className="mt-6 text-3xl font-bold text-slate-800">
//               {stat.value}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
//             <Clock className="w-5 h-5" strokeWidth={2} />
//           </div>
//           <h3 className="text-lg font-semibold text-slate-700">
//             Recent Activity
//           </h3>
//         </div>

//         {dashboardData.recentActvity &&
//         (dashboardData.recentActvity.documents.length > 0 ||
//           dashboardData.recentActvity.quizzes.length > 0) ? (
//           <div className="space-y-4">
//             {[
//               ...(dashboardData.recentActvity.documents || []).map(doc => ({
//                 id: doc._id,
//                 description: doc.title,
//                 timestamp: doc.lastAccessed,
//                 link: `/documents/${doc._id}`,
//                 type: "document",
//               })),
//               ...(dashboardData.recentActvity.quizzes || []).map(quiz => ({
//                 id: quiz._id,
//                 description: quiz.title,
//                 timestamp: quiz.lastAccessed,
//                 link: `/quizzes/${quiz._id}`,
//                 type: "quiz",
//               })),
//             ]
//               .sort(
//                 (a, b) =>
//                   new Date(b.timestamp) - new Date(a.timestamp)
//               )
//               .map((activity, index) => (
//                 <div
//                   key={activity.id || index}
//                   className="flex justify-between items-center bg-white rounded-xl p-4 hover:bg-slate-50 transition shadow-sm hover:shadow-md"
//                 >
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-2.5 h-2.5 rounded-full ${
//                           activity.type === "document"
//                             ? "bg-gradient-to-r from-blue-400 to-cyan-500"
//                             : "bg-gradient-to-r from-emerald-400 to-teal-500"
//                         }`}
//                       />

//                       <p className="text-sm text-slate-600">
//                         {activity.type === "document"
//                           ? "Accessed Document:"
//                           : "Attempted Quiz"}
//                         <span className="font-medium ml-1 text-slate-800">
//                           {activity.description}
//                         </span>
//                       </p>
//                     </div>

//                     <p className="text-xs text-slate-400 mt-1">
//                       {new Date(activity.timestamp).toLocaleString()}
//                     </p>
//                   </div>

//                   {activity.link && (
//                     <a
//                       href={activity.link}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
//                     >
//                       View →
//                     </a>
//                   )}
//                 </div>
//               ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 text-slate-500">
//             <Clock className="mx-auto mb-4 w-8 h-8 text-slate-400" />
//             <p className="font-medium">No recent activity yet.</p>
//             <p className="text-sm mt-1">
//               Start learning to see your progress here.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
// }
// export default DashboardPage
import React, { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import progressService from "../../services/progressService";
import toast from "react-hot-toast";
import {
  FileText,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Clock,
} from "lucide-react";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data_getDashboardData", data);

        setDashboardData(data.data); // correct based on your API response
      } catch (error) {
        toast.error("Failed to fetch dashboard data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Spinner />;

  if (!dashboardData || !dashboardData.overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <TrendingUp className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 text-sm">
            No dashboard data available.
          </p>
        </div>
      </div>
    );
  }

  const starts = [
    {
      label: "Total Documents",
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      gradient: "from-blue-400 to-cyan-500",
      shadowColor: "shadow-blue-500/25",
    },
    {
      label: "Total Flashcards",
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/25",
    },
    {
      label: "Total Quizzes",
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      gradient: "from-emerald-400 to-teal-500",
      shadowColor: "shadow-emerald-500/25",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Track your learning progress and activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {starts.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm font-medium">
                  {stat.label}
                </span>

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
              </div>

              <div className="mt-6 text-3xl font-bold text-slate-800">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        {/* <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Clock className="w-5 h-5" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              Recent Activity
            </h3>
          </div>

          {dashboardData.recentActivity &&
          ((dashboardData.recentActivity.documents?.length || 0) > 0 ||
            (dashboardData.recentActivity.quizzes?.length || 0) > 0) ? (
            <div className="space-y-4">
              {[
                ...(dashboardData.recentActivity.documents || []).map(
                  (doc) => ({
                    id: doc._id,
                    description: doc.title,
                    timestamp: doc.lastAccessed,
                    link: `/documents/${doc._id}`,
                    type: "document",
                  })
                ),
                ...(dashboardData.recentActivity.quizzes || []).map(
                  (quiz) => ({
                    id: quiz._id,
                    description: quiz.title,
                    timestamp: quiz.lastAccessed,
                    link: `/quizzes/${quiz._id}`,
                    type: "quiz",
                  })
                ),
              ]
                .sort(
                  (a, b) =>
                    new Date(b.timestamp) - new Date(a.timestamp)
                )
                .map((activity, index) => (
                  <div
                    key={activity.id || index}
                    className="flex justify-between items-center bg-white rounded-xl p-4 hover:bg-slate-50 transition shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            activity.type === "document"
                              ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                              : "bg-gradient-to-r from-emerald-400 to-teal-500"
                          }`}
                        />

                        <p className="text-sm text-slate-600">
                          {activity.type === "document"
                            ? "Accessed Document:"
                            : "Attempted Quiz"}
                          <span className="font-medium ml-1 text-slate-800">
                            {activity.description}
                          </span>
                        </p>
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(
                          activity.timestamp
                        ).toLocaleString()}
                      </p>
                    </div>

                    <a
                      href={activity.link}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                    >
                      View →
                    </a>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Clock className="mx-auto mb-4 w-8 h-8 text-slate-400" />
              <p className="font-medium">
                No recent activity yet.
              </p>
              <p className="text-sm mt-1">
                Start learning to see your progress here.
              </p>
            </div>
          )}
        </div> */}
        {/* Recent Activity */}
<div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
      <Clock className="w-5 h-5" strokeWidth={2} />
    </div>
    <h3 className="text-lg font-semibold text-slate-700">
      Recent Activity
    </h3>
  </div>

  {dashboardData.recentActivty &&
  ((dashboardData.recentActivty.documents?.length || 0) > 0 ||
   (dashboardData.recentActivty.quizzes?.length || 0) > 0) ? (

    <div className="space-y-4">
      {[
        ...(dashboardData.recentActivty.documents || []).map(doc => ({
          id: doc._id,
          description: doc.title,
          timestamp: doc.lastAccessed,
          link: `/documents/${doc._id}`,
          type: "document",
        })),
        ...(dashboardData.recentActivty.quizzes || []).map(quiz => ({
          id: quiz._id,
          description: quiz.title,
          timestamp: quiz.lastAccessed,
          link: `/quizzes/${quiz._id}`,
          type: "quiz",
        })),
      ]
        .sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        )
        .map((activity, index) => (
          <div
            key={activity.id || index}
            className="flex justify-between items-center bg-white rounded-xl p-4 hover:bg-slate-50 transition shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    activity.type === "document"
                      ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                      : "bg-gradient-to-r from-emerald-400 to-teal-500"
                  }`}
                />
                <p className="text-sm text-slate-600">
                  {activity.type === "document"
                    ? "Accessed Document:"
                    : "Attempted Quiz"}
                  <span className="font-medium ml-1 text-slate-800">
                    {activity.description}
                  </span>
                </p>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>

            <a
              href={activity.link}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
            >
              View →
            </a>
          </div>
        ))}
    </div>

  ) : (
    <div className="text-center py-12 text-slate-500">
      <Clock className="mx-auto mb-4 w-8 h-8 text-slate-400" />
      <p className="font-medium">No recent activity yet.</p>
      <p className="text-sm mt-1">
        Start learning to see your progress here.
      </p>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default DashboardPage;