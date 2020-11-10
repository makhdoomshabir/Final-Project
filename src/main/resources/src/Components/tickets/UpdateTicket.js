import React from "react";
import {Button, Col, Form} from "react-bootstrap";
/*
THIS IS THE UPDATE PRODUCT SECTION
 */
export function UpdateTicket() {
    return (
        <div>
            <Form id="ticketForm">
                <Form.Row>
                    <Form.Group as={Col} id="cohort">
                        <Form.Label>Cohort</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Software Development</option>
                            <option>Cloud Computing</option>
                            <option>DevOps</option>
                            <option>Robotic Process Automation</option>
                            <option>Pega</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} id="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Form.Row>

                <Form.Group id="issueTitle">
                    <Form.Label>Issue Title</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group id="issueDescription">
                    <Form.Label>Issue Description</Form.Label>
                    <Form.Control as="textarea" rows="4"/>
                </Form.Group>

                <Form.Group id="links">
                    <Form.Label>Links</Form.Label>
                    <Form.Control type="text"/>
                    <button> Add Link</button>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Issue
                </Button>
            </Form>
        </div>
    )
}