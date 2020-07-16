import React, { useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Map from '../map/Map';

/**
 * Creates Search component with search bar.
 */
function Search() {
  const history = useHistory();
  const [predictions, setPredictions] = useState([]);
  const options = predictions.map((prediction) => prediction.description);
  const onMapReady = (google, map) => {};

  const handleInput = (input) => {
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input,
        sessionToken,
      },
      setPredictions
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.whereTo}>
        <h1 className={styles.text}>
          <span className={styles.grey}>g</span>
          <span className={styles.blue}>R</span>
          <span className={styles.blue}>o</span>
          <span className={styles.blue}>u</span>
          <span className={styles.blue}>t</span>
          <span className={styles.blue}>e</span>
          <span className={styles.blue}>s</span>
        </h1>
      </div>
      <Container className={styles.barContainer}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <Typeahead
          type="text"
          className={styles.searchBar}
          onInputChange={(text) => {
            handleInput(text);
          }}
          onChange={(text) => {
            if (text !== '') {
              history.push(`/explore?search=${text[0]}`);
            }
          }}
          options={options}
          placeholder="Where to?"
        />
        <div className={styles.mapContainer}>
          <Map
            onReady={onMapReady}
            attractions={[]}
            mode="pins"
            centerLocation={{ lat: 0, lng: 0 }}
          />
        </div>
      </Container>
    </div>
  );
}

export default Search;
