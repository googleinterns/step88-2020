import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LocationCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Return a card component representing a place the user has selected. 
 * @param location the name of the place selected
 * @param description a description of @param location
 * @param image image of @param location
 */
function LocationCard({location, description, image}) {
  return(
    <Container className="location-card-container">
      <Row>
        <Col xs={11} className="location-card">
          <Card className="text-white">
            <Card.Img src={image} className="location-img" alt="Card image" />
            <Card.ImgOverlay className="overlay"></Card.ImgOverlay>
            <Card.ImgOverlay className="card-txt">
              <Card.Title>{location}</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col xs={1} className="arrows">
          <Row>
            <FontAwesomeIcon icon={faAngleUp} className="up-arrow" />
          </Row>
          <Row>
            <FontAwesomeIcon icon={faAngleDown} className="down-arrow" />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LocationCard;