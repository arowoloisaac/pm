import React from "react";
// import ReactQuill from "react-quill";

interface RichTextViewerProps {
  content: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default RichTextViewer;
