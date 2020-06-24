import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LocationCard from './LocationCard.js';
import { Data } from './data.js';

function LocationCardsList() {

  // map data into list of location cards each representing a place the use selected
  const places = Data.map((place, index) => 
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
      {places}
    </Container>
  );
}

export default LocationCardsList;