import React from 'react';
import './Explore.css';
import AttractionsPanel from '../attractions-panel/AttractionsPanel';
import NavButton from '../navigation/NavButton';

/**
 * Attraction contains the image of the attraction.
 * props.imageUrl contains source of image.
 */
function Explore({images}) {
  return (
    <div className='explore-container'>
      <AttractionsPanel attractionsUrls={images}/>
      <div className="show-route-button">
        <NavButton link={'/route'} label={'Show Route'}/>
      </div>
    </div>
  );
}

export default Explore;
