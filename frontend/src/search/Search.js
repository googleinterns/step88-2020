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
  const [name, setName] = useState('');
  let history = useHistory();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.whereTo}>
        <h1>Where to?</h1>
      </div>
      <Form
        inline
        className={styles.form}
        onSubmit={() => {
          history.push(`/explore?search=${name}`);
        }}
      >
        <FormControl
          type="text"
          className="mr-sm-2 "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="secondary" type="submit">
          <FontAwesomeIcon icon={faSearch} className="optimized-icon" />
        </Button>
      </Form>
    </div>
  );
}

export default Search;
