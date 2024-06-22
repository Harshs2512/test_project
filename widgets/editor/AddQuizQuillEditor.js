import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';

const ContestQuillEditor = ({ onChange, value }) => {
  const [editorContent, setEditorContent] = useState(value);
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const updatedContent = quill.root.innerHTML;
        onChange(updatedContent);
      });
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && value !== editorContent) {
      quill.off('text-change');
      quill.clipboard.dangerouslyPasteHTML(value);
      setEditorContent(value);
      
    }
  }, [quill, value, editorContent]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default ContestQuillEditor;

//modified code below

  