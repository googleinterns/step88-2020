import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  fetch("/api/v1/data")
      .then((response) => response.text())
      .then((text) => {
        console.log("Here is the text from servlet: ", text);
        setText(text);
      });
  return (
    <div>
     {text}
    </div>
  );
}

export default App;
