import React from 'react';
import {Form, Button} from 'react-bootstrap';

const AddSolution = () => {
    return (
        <div>
            <Form id="solutionForm">
                <Form.Group id="solutionDescription">
                    <Form.Label>Solution Description</Form.Label>
                    <Form.Control as="textarea" rows="4"/>
                </Form.Group>

                <Form.Group id="links">
                    <Form.Label>Links</Form.Label>
                    <Form.Control type="text"/>
                    <br/>
                    <Button variant="primary" size="sm"> Add Link</Button>
                </Form.Group>


                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox"
                                label="I understand that this solution will be available in on the public ticket board"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Solution
                </Button>
            </Form>
        </div>
    );
};

export default AddSolution;