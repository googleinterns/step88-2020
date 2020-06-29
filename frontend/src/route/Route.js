import React, { useState } from 'react';
import LocationCard from './LocationCard.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/**
 * Return locations listed in order of the user's planned route. 
 * Route list is customizable via drag and drop (docs: https://github.com/atlassian/react-beautiful-dnd)
 */
function Route({places}) {
  // map data into list of location cards each representing a place the use selected
  const [placesList, setPlacesList] = useState(places);

  // referece: https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
  function handleOnDragEnd(result) {
    const {destination, source, draggableId } = result;

    // no change in list ordering due after drag
    if (!destination) {
      return;
    }

    // item dropped in same place it started in (no change in list ordering)
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newPlacesList = Array.from(placesList);
    newPlacesList.splice(source.index, 1);
    newPlacesList.splice(destination.index, 0, placesList[source.index]);
    setPlacesList(newPlacesList);
  }

  // ref: https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <Droppable droppableId="route-list">
        {provided => 
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {placesList.map((place, index) => 
              <LocationCard 
                location={place.location}
                description={place.description}
                image={place.image}
                index={index}
                key={index}
              />
            )}
            {provided.placeholder}
          </div>
        }
      </Droppable>
    </DragDropContext>
  );
}

export default Route;