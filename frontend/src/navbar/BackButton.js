import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './BackButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

function BackButton({ text }) {
  return (
    <Button variant="outline-primary" className={styles.btn}>
      <FontAwesomeIcon icon={faAngleLeft} className={styles.backCaret} />
      <div>{text}</div>
    </Button>
  );
}

export default BackButton;
