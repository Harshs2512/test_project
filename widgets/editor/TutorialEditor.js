import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
const TutorialEditor = ({ onChange, value }) => {
  const { quill, quillRef } = useQuill();
  const valueRef = useRef(value);
  useEffect(() => {
    if (quill) {
      const editor = quill;
      editor.off('text-change', 'user');
      const currentContent = editor.root.innerHTML.trim();
      if (currentContent !== value) {
        editor.setContents(editor.clipboard.convert(value));
      }
      editor.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const updatedContent = editor.root.innerHTML;
          onChange(updatedContent);
        }
      });
    }
  }, [quill, value, onChange]);
  return (
    <div>
      <div ref={quillRef} style={{ minHeight: "100px", width: "100%" }} />
    </div>
  );
};

export default TutorialEditor;


// import React, { useEffect, useRef } from 'react';
// import { useQuill } from 'react-quilljs';

// const TutorialEditor = ({ onChange, value }) => {
//   const { quill, quillRef } = useQuill({
//     modules: {
//       toolbar: [
//         ['bold', 'italic'],
//         ['link', 'blockquote', 'code-block', 'image'],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         [{ 'indent': '-1' }, { 'indent': '+1' }], 
//         [{ 'direction': 'rtl' }], 
//         [{ 'align': [] }], 
//       ],
//     },
//   });

//   const valueRef = useRef(value);

//   useEffect(() => {
//     if (quill) {
//       const editor = quill;

//       editor.off('text-change', 'user');
//       const currentContent = editor.root.innerHTML.trim();
//       if (currentContent !== value) {
//         editor.setContents(editor.clipboard.convert(value));
//       }
//       editor.on('text-change', (delta, oldDelta, source) => {
//         if (source === 'user') {
//           const updatedContent = editor.root.innerHTML;
//           onChange(updatedContent);
//         }
//       });
//     }
//   }, [quill, value, onChange]);

//   return (
//     <div>
//       <div ref={quillRef} style={{ minHeight: "100px", width: "100%" }} />
//     </div>
//   );
// };

// export default TutorialEditor;
