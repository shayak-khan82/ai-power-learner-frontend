// import React from 'react'

// const Tabs = ({tabs,activeTab,setActiveTab}) => {
//   return (
//     <div>
//     <div className=''>
//         <nav className=''>
//             {tabs.map((tab) => (
//                 <button
//                 key={tab.name}
//                 onClick={() => setActiveTab(tab.name)}
//                 className={`relative pb-4 px-6 text-sm font-semibold transition-all duration-200 ${
//                    activeTab === tab.name
//                    ? 'text-emerald-600'
//                    : 'text-slate-600 hover:text-slate-900' 
//                 }`}>
//                     <span className=''>{tab.label}</span>
//                     {activeTab === tab.name && (
//                         <div className=''/>
//                     )}
//                     {activeTab === tab.name && (
//                         <div className=''/>
//                     )}
//                 </button>
//             ))}
//         </nav>
//     </div>
//     <div className=''>
//         {tabs.map((tab) => {
//             if(tab.name === activeTab) {
//                 return (
//                     <div
//                     key={tab.name} className=''
//                     >{tab.content}
//                     </div>
//                 )
//             }
//             return null
//         })}
//     </div>
//     </div>
//   )
// }

// export default Tabs
import React from 'react'

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full">

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6">

          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.name
                  ? 'text-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}

              {/* Animated Underline */}
              {activeTab === tab.name && (
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-emerald-600 rounded-full transition-all duration-300"></span>
              )}
            </button>
          ))}

        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.map((tab) =>
          tab.name === activeTab ? (
            <div
              key={tab.name}
              className="animate-fadeIn"
            >
              {tab.content}
            </div>
          ) : null
        )}
      </div>

    </div>
  )
}

export default Tabs