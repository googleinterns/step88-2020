import React, { useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Typeahead } from 'react-bootstrap-typeahead';
import Container from 'react-bootstrap/Container';

/**
 * Creates Search component with search bar.
 */
function Search() {
  const history = useHistory();
  const [options, setOptions] = useState([]);

  const {
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e);
  };

  const renderSuggestions = () => {
    setOptions(
      data.map((suggestion) => {
        const {
          structured_formatting: { main_text },
        } = suggestion;
        return main_text;
      })
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
            status === 'OK' && renderSuggestions();
          }}
          onChange={(text) => {
            if (text !== '') {
              history.push(`/explore?search=${text[0]}`);
            }
          }}
          options={options}
          placeholder="&#xF002; Where to?"
        />
      </Container>
    </div>
  );
}

export default Search;
