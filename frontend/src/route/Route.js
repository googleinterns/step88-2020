import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LocationCard from './LocationCard.js';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/**
 * Return locations listed in order of the user's planned route.
 */
function Route({places}) {
  // map data into list of location cards each representing a place the use selected
  const mockPlaces = places.map((place, index) => 
    <LocationCard 
      location={place.location}
      description={place.description}
      image={place.image}
      index={index}
      key={index}
    />
  );

  function handleOnDragEnd() {
    // TODO 
  }

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <Droppable droppableId="route-list">
        {provided => {
          console.log(provided)
          return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {mockPlaces}
            {provided.placeholder}
          </div>)
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default Route;