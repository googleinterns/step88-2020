import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './TripName.module.css';

/**
 * Returns the trip name component that the user can edit and save.
 * @param {string|undefined} tripName the name of the trip
 */
function TripName({ tripName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(tripName || '');

  function handleSave(e) {
    e.preventDefault();
    setIsEditing(false);
    // send to back end
  }

  function handleChange(e) {
    setName(e.value);
  }

  return (
    <Container
      className={`${styles.tripNameContainer} ${isEditing ? styles.edit : ''}`}
    >
      <Form
        noValidate
        onClick={() => setIsEditing(true)}
        className={styles.form}
        onSubmit={handleSave}
      >
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend className={styles.editIcon}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Trip Name"
              defaultValue={name}
              aria-describedby="inputGroupPrepend"
              className={styles.tripNameInput}
              onChange={handleChange}
              onBlur={handleSave}
              required
            />
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default TripName;
