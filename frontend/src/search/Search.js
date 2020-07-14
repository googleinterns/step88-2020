import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Typeahead } from 'react-bootstrap-typeahead';

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
    // Update the keyword of the input element
    setValue(e);
  };

  const renderSuggestions = () => {
    setOptions(
      data.map((suggestion) => {
        const {
          structured_formatting: {main_text},
        } = suggestion;
        return main_text;
      })
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.whereTo}>
        <h1 className={styles.text}>
          <span className={styles.blue}>B.</span>
          <span className={styles.red}>E.</span>
          <span className={styles.yellow}>A.</span>
          <span className={styles.green}>N.</span>
          <span className={styles.blue}>S.</span>
        </h1>
      </div>
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
        placeholder="Where to?"
      />
    </div>
  );
}

export default Search;
