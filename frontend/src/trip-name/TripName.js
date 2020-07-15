import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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

  function handleSave() {
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
      <Row>
        <Form noValidate onClick={() => setIsEditing(true)}>
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
                required
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Row>
      <Row className={styles.saveRow}>
        <div className={styles.saveBtn} onClick={handleSave}>
          Save
        </div>
      </Row>
    </Container>
  );
}

export default TripName;
