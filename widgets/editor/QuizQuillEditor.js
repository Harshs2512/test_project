import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
// import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';

const QuizQuillEditor = ({ onChange, value }) => {
  const [editorContent, setEditorContent] = useState(value);
  const { quill, quillRef } = useQuill();
  
  useEffect(() => {
    if (quill && value !== editorContent) {
      quill.clipboard.dangerouslyPasteHTML(0, value);
      setEditorContent(value);
    }
  }, [quill, value, editorContent]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const updatedContent = quill.root.innerHTML;
          setEditorContent(updatedContent);
          onChange(updatedContent);
        }
      });

      return () => {
        quill.off('text-change');
      };
    }
  }, [quill, onChange]);

  // useEffect(() => {
  //   Prism.highlightAll();
  // }, []);

  return (
    <div>
      <div ref={quillRef} style={{ height: "100px", width: "100%" }} />
    </div>
  );
};

export default QuizQuillEditor;
