import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import React from 'react';
import './Search.css';


/** 
 * Creates Search component with search bar.
 */
function Search() {
  return (
    <div className="search-container">
      <div className="where-to">
        <h1>Where to?</h1>
      </div>
      <div className="form">
        <Form inline>
          <FormControl type="text" className="mr-sm-2" />
          <Button variant="secondary"> 
            <FontAwesomeIcon icon={faSearch} className="optimized-icon" />  
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Search;
