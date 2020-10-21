import React from 'react';
import {Card, Button} from "react-bootstrap";
import {DeleteTicket} from "./DeleteTicket";
import {UpdateTicket} from "./UpdateTicket";

const ResolvedTickets = () => {
    const req = new XMLHttpRequest();
    return req.onreadystatechange = () => {
        // Example Handle Logic
        if (req.status === 200 && req.readyState === 4) {
            if (req.getResponseHeader("Content-Type") === "application/json") {
                let stuff = JSON.parse(req.response);
                return (
                    stuff.forEach(ticket => {
                        return (
                            <div>
                                <Card style={{width: '25rem'}}>
                                    <Card.Body>
                                        <Card.Title>{ticket.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{ticket.author}</Card.Subtitle>
                                        <Card.Text>{ticket.description}</Card.Text>
                                        <Button variant="primary" onClick={UpdateTicket}>Update</Button>
                                        <Button variant="primary">Add Solution</Button>
                                        <Button variant="primary" onClick={DeleteTicket(ticket)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })
                );
            }
        }
    }
}

export default ResolvedTickets;
