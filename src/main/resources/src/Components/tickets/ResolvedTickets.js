import React, {Component} from 'react';
import {Button, Card, CardDeck, ButtonGroup} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';

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

    render() {
        return (
            <div>
                {
                    this.state.tickets === 0 ?
                        <h1>
                            No Tickets
                        </h1> :
                        this.state.tickets.map((ticket) => (
                            <Card key={ticket.id} id="resolvedTicketsCards">
                                <Card.Body key={ticket.id}>
                                    <Card.Title>{ticket.title}</Card.Title>
                                    <Card.Subtitle>{ticket.author}</Card.Subtitle>
                                    <Card.Text>{ticket.description}</Card.Text>
                                    <Card.Text>{ticket.cohort}</Card.Text>
                                    <Card.Text>{ticket.links}</Card.Text>
                                    <ButtonGroup>
                                        <Button>Add Solution</Button>
                                        <Button><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        ))
                }
            </div>
        );
    }
}
