import React, {Component, useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, FormControl, InputGroup} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStepBackward, faFastBackward, faFastForward
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import {Link} from "react-router-dom";

export default class ResolvedTickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            cohortFilter: "",
            currentPage: 1,
            ticketsPerPage: 5,
            status: true,
            runningTime: 0,
            date: new Date()
        };
    }


    componentDidMount() {
        axios.get("http://localhost:8080/allTickets")
            .then(response => response.data)
            .then(
                (data) => {
                    this.setState({
                        tickets: data
                    });
                });
        this.setState({
            status: false,
            runningTime: 0
        });
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    deleteTicket = (ticketId) => {
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

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    handleClick = () => {
        this.setState(state => {
            if (state.status) {
                clearInterval(this.timerID);
            } else {
                this.timerID = setInterval(
                    () => this.tick(),
                    0
                );
            }
            return {status: !state.status};
        });
    };

    handleStop = () => {
        this.setState({status: false});
        clearInterval(this.timerID);
    };

    render() {

        const {tickets, currentPage, ticketsPerPage} = this.state;
        const lastIndex = currentPage * ticketsPerPage;
        const firstIndex = lastIndex - ticketsPerPage;
        const currentTickets = tickets.slice(firstIndex, lastIndex);
        const totalPages = tickets.length / ticketsPerPage;
        const {status, runningTime} = this.state;
        console.log(this.state.status, this.state.runningTime)

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
                    <MyToast show={this.state.show} message={"Book Removed Successfully"} type={"danger"}/>
                </div>
                <Card id="resolvedTicketsCardDeck" className={"bg-dark text-white"}>

                    {tickets.length === 0 ?
                        <h3> No Tickets in this Cohort</h3>
                        :
                        <table>
                            <td>{
                                this.state.tickets.filter(
                                    (ticket) => {
                                        return ticket.status.toLowerCase() === "unresolved";
                                    }
                                ).map(ticket => (
                                    <div key={ticket.ticketId}>
                                        <Card.Header className={"mb-2"} type={"danger"}>
                                            <h3>
                                                Unresolved Tickets
                                            </h3>
                                        </Card.Header>
                                        <Card.Title>{ticket.title}</Card.Title>
                                        <Card.Subtitle>{ticket.author}</Card.Subtitle>
                                        <Card.Text>{ticket.cohort}</Card.Text>
                                        <Card.Text>{ticket.description}</Card.Text>
                                        <Card.Text>{ticket.links}</Card.Text>
                                        <Card.Body>
                                            <Card.Title>
                                                {this.state.date.getMinutes() > 5 ?
                                                    <span
                                                        className={"text-red"}>{this.state.date.toLocaleTimeString()}ms</span>
                                                    :
                                                    <span
                                                        className={"text-white"}>{this.state.date.toLocaleTimeString()}ms</span>}

                                                {runningTime} ms
                                            </Card.Title>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">
                                            {ticket.lastUpdated.toString()}
                                            <ButtonGroup>
                                                <Button onClick={this.handleClick}>
                                                    <Link to={"/update-ticket/" + ticket.ticketId} className={"btn"}>
                                                    <span
                                                        className={"text-white"}> {ticket.status ? 'PAUSED' : 'UPDATE'}</span>
                                                    </Link>
                                                </Button>{' '}
                                                <Button onClick={this.handleStop}>
                                                    <Link to={"/add-solutions/" + ticket.ticketId} className={"btn"}>
                                                    <span
                                                        className={"text-white"}> {ticket.status ? 'CLOSED' : 'UNRESOLVED'} </span>
                                                    </Link>
                                                </Button>{' '}
                                                <Button key={ticket.ticketId}
                                                        onClick={() => this.deleteTicket(ticket.ticketId) + this.handleStop()}>
                                                    DELETE
                                                </Button>
                                            </ButtonGroup>
                                        </Card.Footer>
                                    </div>
                                ))
                            }</td>
                            <td>{
                                this.state.tickets.filter(
                                    (ticket) => {
                                        return ticket.status.toLowerCase() === "resolved";
                                    }
                                ).map(ticketClsd => (
                                    <div key={ticketClsd.ticketId}>
                                        <Card.Header className={"mb-2"} type={"danger"}>
                                            <h3>
                                                Resolved Tickets
                                            </h3>
                                        </Card.Header>
                                        <Card.Title>{ticketClsd.title}</Card.Title>
                                        <Card.Subtitle>{ticketClsd.author}</Card.Subtitle>
                                        <Card.Text>{ticketClsd.cohort}</Card.Text>
                                        <Card.Text>{ticketClsd.description}</Card.Text>
                                        <Card.Text>{ticketClsd.links}</Card.Text>
                                        <Card.Footer className="text-danger">
                                            {ticketClsd.lastUpdated.toString()}
                                            <ButtonGroup className={"text-success"}>
                                                <Button onClick={this.handleClick} className={"text-success"}>
                                                    <Link to={"/update-ticket/" + ticketClsd.ticketId}
                                                          className={"btn"}>
                                                    <span
                                                        className={"text-white"}> {ticketClsd.status ? 'UPDATE' : 'CLOSED'}</span>
                                                    </Link>
                                                </Button>{' '}
                                                <Button key={ticketClsd.ticketId} className={"text-danger"}
                                                        onClick={() => this.deleteTicket(ticketClsd.ticketId) + this.handleStop()}>
                                                    DELETE
                                                </Button>
                                            </ButtonGroup>
                                        </Card.Footer>
                                    </div>
                                ))
                            }</td>
                        </table>
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
