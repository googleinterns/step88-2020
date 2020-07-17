import React, { useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withGoogleApi } from '../googleApiUtils';

/**
 * Creates Search component with search bar.
 */
function Search() {
  const history = useHistory();
  const [predictions, setPredictions] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  const options = predictions.map((prediction) => prediction.description);

  const handleInput = (input) => {
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input,
        sessionToken,
      },
      (newPredictions, status) => {
        if (status === 'OK') {
          setPredictions(newPredictions);
        }
      }
    );
  };

  const handleSearch = (text) => {
    if (text) {
      const searchText = text.constrctor === Array ? text[0] : text;
      history.push(`/explore?search=${searchText}`);
    }
  }

  const handleOnKeyDown = (e) => {
    const isEnter = e.keyCode === 13;
    if (isEnter) {
      handleSearch(options[0]);
    }
  }

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
          onInputChange={handleInput}
          onChange={handleSearch}
          options={options}
          placeholder="Where to?"
          id="Where to?"
          onKeyDown={handleOnKeyDown}
          selected={singleSelections}
        />
      </Container>
    </div>
  );
}

export default withGoogleApi(Search);
