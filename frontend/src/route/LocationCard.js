import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './LocationCard.module.css';
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
    <Container className={styles.locationCardContainer}>
      <Row>
        <Col xs={11} className={styles.locationCard}>
          <Card>
            <Card.Img src={image} className={styles.locationImg} alt="Card image" />
            <Card.ImgOverlay className={styles.overlay}></Card.ImgOverlay>
            <Card.ImgOverlay className={styles.cardTxt}>
              <Card.Title>{location}</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col xs={1} className={styles.arrows}>
          <Row>
            <FontAwesomeIcon icon={faAngleUp} className={styles.upArrow} />
          </Row>
          <Row>
            <FontAwesomeIcon icon={faAngleDown} className={styles.downArrow} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LocationCard;