// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// // import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// // import {dracula} from 'react--syntax-highlighter/dist/esm/styles/prism'
// // import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs'
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {


  return (
    // <div className=''>
    //     <ReactMarkdown
    //     rehypePlugins={[remarkGfm]}
    //     components={{
    //         h1:({node, ...props}) => <h1 className='' {...props} />,
    //         h2:({node, ...props}) => <h2 className='' {...props} />,
    //         h3:({node, ...props}) => <h3 className='' {...props} />,
    //         h4:({node, ...props}) => <h4 className='' {...props} />,
    //         p:({node, ...props}) => <p className='' {...props} />,
    //         a:({node, ...props}) => <a className='' {...props} />,
    //         ul:({node, ...props}) => <ul className='' {...props} />,
    //         ol:({node, ...props}) => <ol className='' {...props} />,
    //         li:({node, ...props}) => <li className='' {...props} />,
    //         strong: ({node, ...props}) => <strong className='' {...props}/>,
    //         em:({ node, ...props}) => <em className='' {...props} />,
    //         blockquote: ({node, ...props}) => <blockquote className='' {...props} />,
    //         code: ({node,inline,className,children, ...props}) => {
    //             const match = /language-(\w+)/.exec(className || '')
    //             return !inline && match ? (
    //                 <SyntaxHighlighter
    //                 style={dracula}
    //                 language={match[1]}
    //                 PreTag="div"
    //                 {...props}
    //                 >
    //                     {String(children).replace(/\n$/,'')}
    //                 </SyntaxHighlighter>
    //             ) : (
    //                 <code className='' {...props}>
    //                     {children}
    //                 </code>
    //             )
    //         },
    //         pre: ({node, ...props}) => <pre className='' {...props} />,
    //     }}
        
    //     {content}
    //          />
      
    // </div>
    <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-strong:text-slate-900 prose-code:text-indigo-600 prose-pre:bg-slate-900 prose-pre:text-slate-100">

  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: (props) => (
        <h1 className="text-2xl font-bold mt-6 mb-3 text-slate-900" {...props} />
      ),
      h2: (props) => (
        <h2 className="text-xl font-semibold mt-5 mb-2 text-slate-800" {...props} />
      ),
      h3: (props) => (
        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-800" {...props} />
      ),
      h4: (props) => (
        <h4 className="text-base font-semibold mt-3 mb-1 text-slate-700" {...props} />
      ),
      p: (props) => (
        <p className="text-sm leading-relaxed text-slate-700 mb-3" {...props} />
      ),
      a: (props) => (
        <a
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      ),
      ul: (props) => (
        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700" {...props} />
      ),
      ol: (props) => (
        <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-700" {...props} />
      ),
      li: (props) => <li className="leading-relaxed" {...props} />,
      strong: (props) => (
        <strong className="font-semibold text-slate-900" {...props} />
      ),
      em: (props) => <em className="italic text-slate-700" {...props} />,
      blockquote: (props) => (
        <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-4" {...props} />
      ),
      code({ inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "")

        return !inline && match ? (
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="div"
            customStyle={{
              borderRadius: "12px",
              padding: "16px",
              fontSize: "13px",
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded-md text-sm" {...props}>
            {children}
          </code>
        )
      },
      pre: (props) => <pre className="rounded-xl overflow-auto" {...props} />,
    }}
  >
    {content}
  </ReactMarkdown>

</div>
  )
}

export default MarkdownRenderer
