import React, {Component} from 'react';
import {Button, Card, CardDeck, FormControl, InputGroup} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStepBackward, faFastBackward, faStepForward, faFastForward, faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import {forEach} from "react-bootstrap/ElementChildren";

export default class ResolvedTickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            currentPage: 1,
            ticketsPerPage: 5,
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
                    this.setState({
                        tickets: this.state.tickets.filter(ticket => ticket.ticketId !== ticketId)
                    });
                } else {
                    this.setState({"show": false});
                }
            });
    };

    render() {

        const {tickets, currentPage, ticketsPerPage } = this.state;
        const lastIndex = currentPage * ticketsPerPage;
        const firstIndex = lastIndex - ticketsPerPage;
        const currentTickets = tickets.slice(firstIndex, lastIndex);
        const totalPages = tickets.length / ticketsPerPage;

        const pageNumCss = {
            width: "45px",
            boarder: "1px solid #17A2B8",
            color: "17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{show: this.state.show, message: "Book Removed Successfully", type: "danger"}}/>
                </div>
                <Card id="resolvedTicketsCardDeck" className={"bg-dark text-white"}>
                    <Card.Header><h3>Resolved Tickets</h3></Card.Header>
                    {tickets.length === 0 ?
                        <h3> No Tickets in this Cohort</h3>
                        :
                        this.state.tickets.map((ticket) => (

                            <div key={ticket.ticketId}>
                                <Card.Title>{ticket.title}</Card.Title>
                                <Card.Subtitle>{ticket.author}</Card.Subtitle>
                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>{ticket.cohort}</Card.Text>
                                <Card.Text>{ticket.author}</Card.Text>
                                <Button>Update</Button>
                                <Button>Add Solution</Button>
                                <Button key={ticket.ticketId}
                                        onClick={() => this.deleteTicket(ticket.ticketId)}>Delete</Button>
                            </div>
                        ))
                    }

                    <Card.Footer>
                        <div style={{"float": "left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float": "right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward}/> First
                                    </Button>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage"
                                             value={currentPage}
                                             onClick={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faFastForward}/> Next
                                    </Button>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faStepBackward}/> Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
