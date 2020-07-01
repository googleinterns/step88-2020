import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './OptimizeButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Render a button to optimize route on click.
 * If route is optimized, render text indicating that it is optimized.
 * @param {boolean|undefined} optimized indicates whether route has been optimized
 */
function OptimizeButton({ optimized }) {
  const [isOptimized, setIsOptimized] = useState(optimized);

  if (isOptimized) {
    return (
      <div className={`${styles.optimizedBtnContainer} ${styles.optimizedTxt}`}>
        Optimized
        <FontAwesomeIcon icon={faCheckCircle} className={styles.optimizedIcon} />
      </div>
    );
  }

  return (
    <div className={styles.optimizedBtnContainer}>
      <Button variant="primary" onClick={() => setIsOptimized(true)}>
        Optimize
      </Button>
    </div>
  );
}

export default OptimizeButton;
