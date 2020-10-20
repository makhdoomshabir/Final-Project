import React from 'react';
import { Form, Col, Button} from 'react-bootstrap';
import NavigationBar from './NavigationBar';

const NewTicket = () => {
    return(
        <div>
            <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Cohort</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>Software Developer</option>
        <option>Cloud Native</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Author</Form.Label>
      <Form.Control type="password"/>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Issue Title</Form.Label>
    <Form.Control />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Issue Description</Form.Label>
    <Form.Control as="textarea" rows="4"/>
  </Form.Group>


  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="I understand that my Issue will be posted to the public ticket board" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit Issue
  </Button>
</Form>
        </div>
    );
};

export default NewTicket;