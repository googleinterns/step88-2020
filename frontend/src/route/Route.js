import React from 'react';
import LocationCard from './LocationCard.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/**
 * Return locations listed in order of the user's planned route.
 * Route list is customizable via drag and drop (docs: https://github.com/atlassian/react-beautiful-dnd)
 */
function Route({ places, onManualPlaceChange }) {
  // referece: https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
  function handleOnDragEnd({ destination, source, draggableId }) {
    // no change in list ordering due after drag
    if (!destination) {
      return;
    }

    // item dropped in same place it started in (no change in list ordering)
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newPlaces = Array.from(places);
    newPlaces.splice(source.index, 1);
    newPlaces.splice(destination.index, 0, places[source.index]);
    onManualPlaceChange(newPlaces);
  }

  // ref: https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="route-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {places.map((place, index) => (
              <LocationCard
                location={place.name}
                description={place.description}
                image={place.photoUrl}
                index={index}
                key={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Route;
