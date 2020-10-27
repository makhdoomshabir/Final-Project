import React, {Component} from 'react';
import {Button, Card, CardDeck} from "react-bootstrap";
import axios from "axios";

export default class ResolvedTickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: {}
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/allTickets")
            .then(response => response.data)
            .then(
                (data) => {
                    this.setState({tickets: data});
                });
    }

    deleteTicket = (ticketId) => {
        alert(ticketId);
        axios.delete("http://localhost:8080/deleteTicket/" + ticketId)
            .then(response => response.data)
            .then(
                (data) => {
                    if (data != null) {
                        alert("Ticket removed successfully");
                        this.setState(
                            {
                                tickets: this.state.tickets.filter(ticket => ticket.id !== ticketId)
                            }
                        );
                    }
                }
            );
    };

    _renderObject() {
        return Object.entries(
            <CardDeck>
                {
                    this.state.tickets.forEach(ticket => {
                        <Card key={ticket.id}>
                            <Card.Body key={ticket.id}>
                                <Card.Title>{ticket.title}</Card.Title>
                                <Card.Subtitle>{ticket.author}</Card.Subtitle>
                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>{ticket.cohort}</Card.Text>
                                <Card.Text>{ticket.author}</Card.Text>
                                <Button>Update</Button>
                                <Button>Add Solution</Button>
                                <Button key={ticket.id} onClick={() => this.deleteTicket(ticket.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    })
                }
            </CardDeck>
        );
    }
}
