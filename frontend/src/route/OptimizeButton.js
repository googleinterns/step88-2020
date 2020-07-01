import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './OptimizeButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Render a button to optimize route on click.
 * If route is optimized, render text indicating that it is optimized.
 * @param {boolean|undefined} isOptimized indicates whether route has been optimized
 * @param {function} optimize called to optimize the route
 */
function OptimizeButton({ isOptimized, optimize }) {

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
      <Button variant="primary" onClick={optimize}>
        Optimize
      </Button>
    </div>
  );
}

export default OptimizeButton;
