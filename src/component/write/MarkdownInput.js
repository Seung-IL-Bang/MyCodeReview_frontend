import { Editor } from "@toast-ui/react-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import { useRef } from "react";

export default function MarkdownInput(props) {
  const editorRef = useRef();

  const GetContent = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      props.onGetContent(markdown);
    }
  };

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
        previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"}
        height="600px"
        usageStatistics={false}
        toolbarItems={toolbarItems}
        useCommandShortcut={true}
        hideModeSwitch={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </>
  );
}
