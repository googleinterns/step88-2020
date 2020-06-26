import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './OptimizeButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Render a button to optimize route on click. 
 * If route is optimized, render text indicating that it is optimized.
 * @param {boolean|undefined} optimized indicates whether route has been optimized 
 */
function OptimizeButton({optimized}) {
  const [isOptimized, setIsOptimized] = useState(optimized);

  if (isOptimized) {
    return (
      <div className="optimized-btn-container optimized-txt">
        Optimized 
        <FontAwesomeIcon icon={faCheckCircle} className="optimized-icon" /> 
      </div>
    )
  }

  return (
    <div className="optimized-btn-container">
      <Button variant="primary" onClick={() => setIsOptimized(true)}>Optimize</Button>
    </div>
  );
}

export default OptimizeButton;