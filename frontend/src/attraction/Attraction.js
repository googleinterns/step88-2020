import React from 'react';
import './Attraction.css';

/**
 * Attraction contains the image of the attraction.
 * props.imageUrl contains source of image.
 */
function Attraction({imageUrl}) {
  return (
    <div className='attraction-container'>
      <img src={imageUrl} />
    </div>
  );
}

export default Attraction;
