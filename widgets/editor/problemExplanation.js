import React, { useEffect, useState, useRef } from 'react';
import { useQuill } from 'react-quilljs';

const ProblemExplanation = ({ onChange, value }) => {
  const [editorContent, setEditorContent] = useState('');
  const { quill, quillRef } = useQuill();
  const valueRef = useRef('');

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const updatedContent = quill.root.innerHTML;
          valueRef.current = updatedContent;
          onChange(updatedContent);
        }
      });

      if (value && value !== valueRef.current) {
        quill.root.innerHTML = value;
        setEditorContent(value);
      }
    }
  }, [quill, value, onChange]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default ProblemExplanation;
