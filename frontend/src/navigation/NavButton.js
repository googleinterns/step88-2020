import React from 'react';
import styles from './NavButton.module.css';
import Button from 'react-bootstrap/Button';

/**
 * Navigation bar link button
 * @param {string} link url to redirect to
 * @param {string} label label of button
 */
function NavButton({ href, label }) {
  return (
    <Button href={href} type='button' className={styles.navButton}>
      {label}
    </Button>
  );
}

export default NavButton;
