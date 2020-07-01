import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import React, { useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';

/**
 * Creates Search component with search bar.
 */
function Search() {
  const [query, setQuery] = useState('');
  const history = useHistory();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.whereTo}>
        <h1>Where to?</h1>
      </div>
      <Form
        inline
        className={styles.form}
        onSubmit={() => {
          if (query !== '') {
            history.push(`/explore?search=${query}`);
          }
        }}
      >
        <FormControl
          type="text"
          className="mr-sm-2 "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="secondary" type="submit">
          <FontAwesomeIcon icon={faSearch} className="optimized-icon" />
        </Button>
      </Form>
    </div>
  );
}

export default Search;
