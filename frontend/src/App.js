import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Explore from './explore/Explore';
import imgTest from './attraction/Attraction.png';

import RouteView from './RouteView.js';

function App() {
  const [text, setText] = useState('');

  function handleClick() {
    fetch('/api/v1/data')
      .then((response) => response.text())
      .then(setText);
  }

  return (
    <div>
      <Explore images={[imgTest, imgTest, imgTest]} />
    </div>
  );
}

export default App;
