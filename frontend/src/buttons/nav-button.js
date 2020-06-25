import React from 'react';
import './nav-button.css';

/**
 * NavButton is passed two properties
 * url which has the link to go to
 * text which has the button label
 **/
function NavButton(props) {
  return (
    <a href={props.link}>
      <button id='nav-button' type='button' className='btn btn-primary'>{props.label}</button>
    </a>
  );
}

export default NavButton;
