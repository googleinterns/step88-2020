import React, { useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import Container from 'react-bootstrap/Container';
import Map from '../map/Map';
/**
 * Creates Search component with search bar.
 */
function Search() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const options = data.map((suggestion) => suggestion.description);
  const onMapReady = (google, map) => {};

  const handleInput = (input) => {
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input,
        sessionToken,
      },
      setData
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.whereTo}>
        <h1 className={styles.text}>
          <span className={styles.blue}>B</span>
          <span className={styles.red}>e</span>
          <span className={styles.yellow}>a</span>
          <span className={styles.green}>n</span>
          <span className={styles.blue}>s</span>
        </h1>
      </div>
      <Container className={styles.barContainer}>
        <Typeahead
          type="text"
          id="basic-typeahead-single"
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
          placeholder="&#xF002; Where to?"
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
