import {useRef, forwardRef, useImperativeHandle, useState } from 'react';
import MarkdownInput from "./MarkdownInput";
import MarkdownSubmit from "./MarkdownSubmit";
import TitleForm from "./TitleForm";

export default function Write(props) {

  const titleFormRef = useRef();

  const [content, setContent] = useState('');

  const handleSubmitBoard = () => {
    // call in MarkdownSubmit

    // title get in TitleForm
    const title = titleFormRef?.current?.getTitle();
  
    // content get in MarkdownInput

    // axios post method

    // navigate root page

  };

  return (
    <div>
      <TitleForm ref={titleFormRef} />
      <MarkdownInput />
      <MarkdownSubmit onSaveBoard={handleSubmitBoard}/>
    </div>
  );
}
