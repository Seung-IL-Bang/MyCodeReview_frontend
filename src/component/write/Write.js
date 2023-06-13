import { useState } from "react";
import MarkdownInput from "./MarkdownInput";
import MarkdownSubmit from "./MarkdownSubmit";
import TitleForm from "./TitleForm";

export default function Write(props) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmitBoard = () => {
    
  };

  const handleGetTitle = (title) => {
    setTitle(title);
  };

  const handleGetContent = (markdown) => {
    setContent(markdown)
  };

  return (
    <div>
      <TitleForm onGetTitle={handleGetTitle}/>
      <MarkdownInput onGetContent={handleGetContent}/>
      <MarkdownSubmit />
    </div>
  );
}
