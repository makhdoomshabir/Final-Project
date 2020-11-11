import React from 'react';
import {Card, Button} from "react-bootstrap";

const OpenTickets = () => {
    return (
        <div>
            <Card style={{width: '25rem'}}>
                <Card.Body>
                    <Card.Title>Issue Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Author</Card.Subtitle>
                    <Card.Text>
                        Preview of Description


                    </Card.Text>
                    <Button variant="primary">Update</Button>
                    <Button variant="primary">Add Solution</Button>
                    <Button variant="primary">Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default OpenTickets;