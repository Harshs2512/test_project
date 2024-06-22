import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';

const GuidEditor = ({ onChange, value }) => {
  const { quill, quillRef } = useQuill();
  const editorRef = useRef(null);

  useEffect(() => {
    if (quill && value !== null && value !== undefined) {
      const delta = quill.clipboard.convert(value);
      // Set the editor's contents programmatically
      quill.setContents(delta);

      // Set the cursor position to the end of the editor
      quill.setSelection(quill.getLength(), 0);
    }
  }, [quill, value]);

  useEffect(() => {
    if (quill) {
      // Listen for text changes and trigger onChange
      const handler = (delta, oldDelta, source) => {
        const updatedContent = quill.root.innerHTML;
        onChange(updatedContent);
      };

      quill.on('text-change', handler);

      // Cleanup function to remove the event listener
      return () => {
        quill.off('text-change', handler);
      };
    }
  }, [quill, onChange]);

  return <div ref={quillRef} />;
};

export default GuidEditor;
