import React from 'react';
import styles from './NavButton.module.css';
import Button from 'react-bootstrap/Button';

/**
 * Navigation bar link button
 */
function NavButton({link,label}) {
  return (
    <Button href={link} type='button' className={styles['navButton']}>{label}</Button>
  );
}

export default NavButton;
