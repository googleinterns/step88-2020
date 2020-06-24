import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function App() {
  const [text, setText] = useState('');

  function handleClick() {
    fetch('/api/v1/data')
      .then((response) => response.text())
      .then(setText);
  }

  return (
    <div>
      <Button onClick={handleClick} variant="secondary">Click Me!</Button>
      <div>
        {text}
      </div>
    </div>
  );
}

export default App;
