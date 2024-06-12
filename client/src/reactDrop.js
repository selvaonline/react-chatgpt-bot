// File: App.js
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
// ... other imports

function App() {
  const [document, setDocument] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const onDrop = (acceptedFiles) => {
    setDocument(acceptedFiles[0]); 
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('document', document);
    formData.append('question', question);

    const response = await fetch('/api/answer', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a PDF file here, or click to select file</p>
          </div>
        )}
      </Dropzone>
      {/* ... Question Input and Answer Display components */}
    </div>
  );
}
