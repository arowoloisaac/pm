import React from 'react'
import ReactMarkdown from "react-markdown"

const MarkdownRenderer = ({content}: {content:string}) => {
  return (
    <div className="prose border p-2 w-screen overflow-y-auto 2xl:max-h-[600px] lg:h-[426px] md:h-[350px]">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer