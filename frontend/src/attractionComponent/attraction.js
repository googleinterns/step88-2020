import React from 'react';
import './attraction.css';

/** Attraction contains the image of the attraction.
    props.imageUrl contains source of image.
 **/
function Attraction(props) {
  return (
    <div className='attractionContainer'>
      <img src={props.imageUrl} />
    </div>
  );
}

export default Attraction;
