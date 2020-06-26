import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import './SavedTrips.css';

/** 
 * Creates single saved trip.
 */
function SavedTrip({name}) {
  return (
    <ListGroup.Item className="list-item">
      {name}
      <div>
        <a href="/" title="Edit" className="icon">
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
        <a href="/" title="Share" className="icon">
          <FontAwesomeIcon icon={faShare}/>
        </a>
      </div>
    </ListGroup.Item>
  )
}

export default SavedTrip;