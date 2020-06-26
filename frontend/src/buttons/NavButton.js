import React from 'react';
import './nav-button.css';
import Button from 'react-bootstrap/Button';

/**
 * Navigation bar link button
 */
function NavButton({link,label}) {
  return (
    <Button href={link} type='button' className='btn btn-primary nav-button'>{label}</Button>
  );
}

export default NavButton;
