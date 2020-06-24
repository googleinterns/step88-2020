import React from 'react';
import Card from 'react-bootstrap/Card';
import image from './testImg.jpg'
import './LocationCard.css';

function LocationCard({location, description, image}) {

  return(
    <div className="location-card-container">
      <Card className="text-white location-card">
        <Card.Img src={image} alt="Card image" />
        <Card.ImgOverlay className="overlay"></Card.ImgOverlay>
        <Card.ImgOverlay className="card-txt">
          <Card.Title>Mission Peak</Card.Title>
          <Card.Text>
            Description of location if we want to include it here.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default LocationCard;