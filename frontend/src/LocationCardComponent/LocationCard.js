import React from 'react';
import Card from 'react-bootstrap/Card';
import './LocationCard.css';

function LocationCard({location, description, image}) {

  return(
    <div className="location-card-container">
      <Card className="text-white location-card">
        <Card.Img src={image} alt="Card image" />
        <Card.ImgOverlay className="overlay"></Card.ImgOverlay>
        <Card.ImgOverlay className="card-txt">
          <Card.Title>{location}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default LocationCard;