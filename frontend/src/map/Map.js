import React from 'react';

function Map({destinations}) {

  return (
    <div className="map-container">
      <iframe width="600" 
              height="450" 
              frameBorder="0"
              title="trip-map"
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBbZSSvn85LLfo6F5uF1G7VawuvingacM8&origin=Eiffel+Tower&destination=Museum+d'Orsay&waypoints=Louvre|Arc+De+Triomphe" 
              allowFullScreen
      >
      </iframe>
    </div>
  )
}

export default Map;