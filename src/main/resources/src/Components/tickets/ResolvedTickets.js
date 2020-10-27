import React, {Component} from 'react';
import {Button, Card, CardDeck} from "react-bootstrap";
import axios from "axios";

export default class ResolvedTickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: []
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
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);

                    alert("Ticket removed successfully");
                    this.setState({
                        tickets: this.state.tickets.filter(ticket => ticket.ticketId !== ticketId)
                    });
                }
            });
    };

    render() {
        return (
            <CardDeck>
                {
                    this.state.tickets.map((ticket) => (
                        <Card key={ticket.ticketId}>
                            <Card.Body key={ticket.ticketId}>
                                <Card.Title>{ticket.title}</Card.Title>
                                <Card.Subtitle>{ticket.author}</Card.Subtitle>
                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>{ticket.cohort}</Card.Text>
                                <Card.Text>{ticket.author}</Card.Text>
                                <Button>Update</Button>
                                <Button>Add Solution</Button>
                                <Button key={ticket.ticketId}
                                        onClick={() => this.deleteTicket(ticket.ticketId)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </CardDeck>
        );
    }
}
