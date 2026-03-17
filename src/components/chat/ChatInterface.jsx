import React ,{useState,useEffect, useRef} from 'react'
import { Send,MessageSquare, Sparkles } from 'lucide-react'
import { useParams } from 'react-router-dom'
import aiService from '../../services/aiService'
import {useAuth} from '../../context/AuthContext'
import Spinner from '../common/Spinner'
import MarkdownRenderer from '../common/markdownRenderer'

const ChatInterface = () => {
    const {id: documentId } = useParams()
    const {user} = useAuth()
    const[history,setHistory] = useState([])
    const[message,SetMessage] = useState('')
    const[loading,setLoading] = useState(false)
    const[initialLoading,setInitialLoading] = useState(true)
    const messageEndRef = useRef()

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior:"smooth"})
    }

    useEffect (() => {
        const fetchChatHistory = async () => {
            try {
                setInitialLoading(true)
                const response = await aiService.getChatHistory(documentId)
                setHistory(response.data)
            } catch (error) {
                console.error('failed to fetch chat histroy:', error)
            } finally {
                setInitialLoading(false)
            }
        }
        fetchChatHistory()
    },[documentId])


    useEffect(() => {
        scrollToBottom()
    },[history])
    const handleSendMessage = async (e) => {
        e.preventDefault()
        if(!message.trim()) return;

        const userMessage = {role:'user',content:message,timestamp:new Date()}
        setHistory(prev => [...prev,userMessage])
        SetMessage('')
        setLoading(true)

        try {
            const response = await aiService.chat(documentId, userMessage.content)
            const assistantMessage = {
                role:'assistant',
                content:response.data.answer,
                timestamp:new Date(),
                relevantChunks:response.data.relevantChunks
            }
            setHistory(prev => [...prev,assistantMessage])
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage = {
                role:'assistant',
                content:'Sorry,I encountered an error. please try again.',
                timestamp:new Date()
            }
            setHistory(prev => [...prev,errorMessage])
        } finally {
            setLoading(false)
        }
    }
    // const renderMessage = (msg,index) => {
    //     const isUser = msg.role === 'user'
    //     return (
    //         <div key={index} className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end':''}`}>
    //             {!isUser  && (
    //                 <div className=''>
    //                     <Sparkles className='' strokeWidth={2} />
    //                      <div/>
    //             )}
    //             <div className={`max-w-lg p-4 rounded-2xl shadow-sm ${
    //                 isUser
    //                 ? 'bg-linear-to-br from-emerald-500 to-teal-500 text-white rounded-br-md'
    //                 : 'bg-white border border-slate-200/60 text-slate-800 rounded-bl-md'
    //             }`}>
    //                 {isUser ? (
    //                     <p className=''>{msg.content}</p>
    //                 ) : (
    //                     <div className=''>
    //                         {user?.username?.charAt(0).toUpperCase() || 'U'}
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     )
    // }


    const renderMessage = (msg, index) => {
  const isUser = msg.role === "user";

  return (
    <div
      key={index}
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
          <Sparkles
            className="w-4 h-4 text-indigo-600"
            strokeWidth={2}
          />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-md"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{msg.content}</p>
        ) : (
          <MarkdownRenderer content={msg.content}/>
        )}
      </div>
    </div>
  );
};
    if(initialLoading) {
        return (
            <div className='flex flex-col h-[70vh] bg-white/80 backdrop:-blur-xl border border-slate-200/60 rounded-2xl items-center justify-center shadow-xl shadow-slate-200/50 '>
                <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4'>
                    <MessageSquare className='w-7 h-7 text-emerald-600' strokeWidth={2} />
                </div>
                <Spinner/>
                <p className='text-sm text-slate-500 mt-3 font-medium'>Loading chat histroy...</p>
            </div>
        )
    }
  return (
    // <div className=''>
    //   {/*Message area */}
    //   <div className=''>
    //     {history.length === 0 ? (
    //         <div className=''>
    //             <div className=''>
    //                 <MessageSquare className='' strokeWidth={2}/>
    //             </div>
    //             <h3 className=''>start a conversation</h3>
    //             <p className=''>Ask me anything about the document!</p>
    //         </div>
    //     ): (
    //         history.map(renderMessage)
    //     )}
    //     <div ref={messageEndRef}/>
    //     {loading && (
    //         <div className=''>
    //         <div className=''> 
    //             <Sparkles className='' strokeWidth={2}/>
    //         </div>
    //         <div className=''>
    //             <div className=''>
    //             <span className='' style={{ animationDelay:'0ms'}}></span>
    //             <span className='' style={{animationDelay:'150ms'}}></span>
    //             <span className='' style={{animationDelay:'300ms'}}></span>
    //         </div>
    //         </div>
    //         </div>
    //     )}
    //   </div>
    // </div>
    <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">

  {/* Messages Container */}
  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

    {history.length === 0 ? (
      <div className="flex flex-col items-center justify-center text-center h-full">

        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
          <MessageSquare
            className="text-indigo-600"
            size={28}
            strokeWidth={2}
          />
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Start a Conversation
        </h3>

        <p className="text-sm text-slate-500 max-w-sm">
          Ask me anything about this document and I’ll help you understand it better.
        </p>
      </div>
    ) : (
      history.map(renderMessage)
    )}

    {/* Scroll Anchor */}
    <div ref={messageEndRef} />

    {/* AI Typing Indicator */}
    {loading && (
      <div className="flex items-center gap-3">

        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-50">
          <Sparkles className="text-indigo-600" size={18} strokeWidth={2} />
        </div>

        <div className="bg-slate-100 px-4 py-3 rounded-2xl flex gap-1">

          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}></span>

          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}></span>

          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}></span>

        </div>

      </div>
    )}

  </div>
  {/**input Area */}
  {/* <div className='p-5 border-t border-slate-200/60 bg-white/80'>
    <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
        <input type="text" 
        value={message}
        onChange={(e) => SetMessage(e.target.value)}
        placeholder='Ask a follow-up question...'
        className='flex-1 h-12 px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder:bg-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/100'
        disabled={loading}
        />
        <button
        type='submit'
        disabled={loading || !message.trim()}
        className='shrink-0 w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center'
        >
            <Send className='w-5 h-5' strokeWidth={2}/>
        </button>
    </form>
  </div> */}
  <div className="p-5 border-t border-slate-200 bg-white/80 backdrop-blur">
  <form onSubmit={handleSendMessage} className="flex items-center gap-3">

    <input
      type="text"
      value={message}
      onChange={(e) => SetMessage(e.target.value)}
      placeholder="Ask a follow-up question..."
      disabled={loading}
      className="flex-1 h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    />

    <button
      type="submit"
      disabled={loading || !message.trim()}
      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transition hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
    >
      <Send className="w-5 h-5" strokeWidth={2} />
    </button>

  </form>
</div>
</div>
  )
}

export default ChatInterface
