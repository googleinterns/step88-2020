import React from 'react';
import './nav-button.css';

/**
 * NavButton is passed two properties
 * url which has the url to go to
 * text which has the button text
 **/
function NavButton(props) {
  return (
    <a href={props.url}>
      <button id='nav-button' type='button' class='btn btn-primary'>{props.text}</button>
    </a>
  );
}

export default NavButton;
