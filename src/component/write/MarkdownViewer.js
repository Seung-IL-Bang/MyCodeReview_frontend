import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer, Editor } from '@toast-ui/react-editor';



export default function MarkdownViewer() {
  
  const editor = new Editor();
  const content = editor.getMarkdown()

  return (
    <Viewer
      initialValue={content}
     />
  );
}
