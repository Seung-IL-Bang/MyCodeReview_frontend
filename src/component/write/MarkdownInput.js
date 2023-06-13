import { Editor } from "@toast-ui/react-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const MarkdownInput = forwardRef(function MarkdownInput(props, ref) {
  const editorRef = useRef();
  const [content, setContent] = useState('');

  useImperativeHandle(ref, () => {
    return {
      getContent() {

        handleContentChange()
        console.log('getContent: ' + content)
        return content
      }
    }
  }, [content])


  const handleContentChange = (event) => {
    const markdown = editorRef.current.getInstance().getMarkdown();
    setContent(markdown)
    return content
  }

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ];

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={" "}
        initialEditType="markdown"
        previewStyle="vertical"
        height="600px"
        usageStatistics={false}
        toolbarItems={toolbarItems}
        useCommandShortcut={true}
        hideModeSwitch={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={handleContentChange}
      />
    </>
  );
});


export default MarkdownInput;