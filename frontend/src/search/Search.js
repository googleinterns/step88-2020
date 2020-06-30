import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import React from 'react';
import styles from './Search.module.css';


/** 
 * Creates Search component with search bar.
 */
function Search() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.whereTo}>
        <h1>Where to?</h1>
      </div>
      <Form inline className={styles.form}>
        <FormControl type="text" className="mr-sm-2" />
        <Button variant="secondary"> 
          <FontAwesomeIcon icon={faSearch} className="optimized-icon" />  
        </Button>
      </Form>
    </div>
  )
}

export default Search;
