import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import React from 'react';

/** 
  Creates basic search bar.
 */
function Search() {
  return (
    <div>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="secondary">Search</Button>
      </Form>
    </div>
  )
}

export default Search;