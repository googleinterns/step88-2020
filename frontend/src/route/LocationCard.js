import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './LocationCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

/**
 * Return a card component representing a place the user has selected.
 * @param {string} location the name of the place selected
 * @param {string} image image source of @param location
 * @param {number} index index of location in route list
 */
function LocationCard({ location, image, index }) {
  // ref: https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided) => (
        <Container
          className={styles.locationCardContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Row>
            <Col xs={11} className={styles.locationCard}>
              <Card>
                <Card.Img src={image} className={styles.locationImg} alt="Card image" />
                <Card.ImgOverlay className={styles.overlay}></Card.ImgOverlay>
                <Card.ImgOverlay>
                  <Card.Title className={styles.locationName}>{location}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col className={styles.arrows}>
              <FontAwesomeIcon icon={faSort} />
            </Col>
          </Row>
        </Container>
      )}
    </Draggable>
  );
}

export default LocationCard;
