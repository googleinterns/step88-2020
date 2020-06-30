import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LocationCard from './LocationCard.js';

/**
 * Return locations listed in order of the user's planned route.
 */
function Route({places}) {
  // map data into list of location cards each representing a place the use selected
  const mockPlaces = places.map((place, index) => 
    <Row key={index}>
      <LocationCard 
        location={place.location}
        description={place.description}
        image={place.image}
      />
    </Row>
  );

  return (
    <Container>
      {mockPlaces}
    </Container>
  );
}

export default Route;