import React, {Component, useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, FormControl, InputGroup, Tooltip} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStepBackward, faFastBackward, faFastForward, faTimes, faSearch, faTrash, faPlusSquare, faEdit
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import {Link} from "react-router-dom";

export default class Tickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            keyword: '',
            cohortFilter: window.location.pathname.toLowerCase().replaceAll("/", ""),
            currentPage: 1,
            ticketsPerPage: 5,
            status: true,
            isResolved: true
        };
    }


    componentDidMount() {
        axios.get("http://localhost:8080/allTickets")
            .then(response => response.data)
            .then(
                (data) => {
                    this.setState({
                        tickets: data.filter(ticket => ticket.cohort === this.state.cohortFilter),
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

    changePage = event => {
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        })
    }

    //Pagination
    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage -1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.tickets.length / this.state.ticketsPerPage)) {
            this.setState({
                currentPage: (Math.ceil(this.state.tickets.length / this.state.ticketsPerPage))
            })
        }
    }

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.tickets.length / this.state.ticketsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage +1
            })
        }
    };

    // Code for filtering through data by keyword
    searchChange = event => {
        this.setState({
            "keyword" : event.target.value
        })
    }

    cancelSearch = () => {
        this.setState({
            "keyword" : ""
        })
    }

    searchData = () => {
        axios.get("http://localhost:8080/allTickets?keyword="+this.state.keyword)
            .then(response => response.data)
            .then(
                (data) => {
                    this.setState({tickets: data});
                });
    }

    resolve = () => {
        this.setState({isResolved: false})
    };

    unresolved = () => {
        this.setState({isResolved: true})
    }

    //Conditional Rendering of tickets based on tab selected

    displayResolved = () => {

        const renderEditTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Edit Ticket
            </Tooltip>
        );
        const renderDeleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete Ticket
            </Tooltip>
        );

        const renderSolutionTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Add Solution
            </Tooltip>
        );

        if (this.state.isResolved === true) {
            return (
                <Card.Body>
                    <h3>Unresolved</h3>
                    {this.state.tickets.filter(
                        (ticket) => {
                            return ticket.status.toLowerCase() === "unresolved";
                        }
                    ).map(ticket => (
                        <div key={ticket.ticketId}>
                            <Card.Header>
                                <div>
                                    {ticket.author}
                                </div>

                                Posted
                                {this.state.date.getMinutes() > 5 ?
                                    <span
                                        className={"text-red"}>{this.state.date.toLocaleTimeString()}ms
                                                        </span>
                                    :
                                    <span
                                        className={"text-white"}>{this.state.date.toLocaleTimeString()}ms
                                                        </span>
                                }
                                ago
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-white">
                                    {ticket.title}
                                </Card.Title>

                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>{ticket.links}</Card.Text>
                                <Card.Subtitle>
                                    <div style={{"float": "left"}}>
                                        Last Updated: {ticket.lastUpdated.toString()}
                                    </div>

                                </Card.Subtitle>


                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div>
                                    <ButtonGroup>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{show: 250, hide: 400}}
                                            overlay={renderEditTooltip}
                                        >
                                            <Button size="sm" onClick={this.handleClick}>
                                                <Link to={"/update-ticket/" + ticket.ticketId}
                                                      className={"btn"}>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Link>
                                            </Button>
                                        </OverlayTrigger>
                                        {' '}
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{show: 250, hide: 400}}
                                            overlay={renderSolutionTooltip}
                                        >
                                            <Button size="sm" onClick={this.handleStop}>
                                                <Link to={"/add-solutions/" + ticket.ticketId}
                                                      className={"btn"}>
                                                    <FontAwesomeIcon icon={faPlusSquare}/>
                                                </Link>
                                            </Button>
                                        </OverlayTrigger> {' '}
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{show: 250, hide: 400}}
                                            overlay={renderDeleteTooltip}
                                        >
                                            <Button size="sm" key={ticket.ticketId}
                                                    onClick={() => this.deleteTicket(ticket.ticketId) + this.handleStop()}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </OverlayTrigger>
                                    </ButtonGroup>
                                </div>
                            </Card.Footer>
                            <br/>
                        </div>
                    ))
                    }
                </Card.Body>

            )
        } else {
            return (
            <Card.Body>
                <h3>Resolved</h3>
                {this.state.tickets.filter(
                    (ticket) => {
                        return ticket.status.toLowerCase() === "resolved";
                    }
                ).map(ticketClsd => (
                    <div key={ticketClsd.ticketId}>
                        <Card.Header className="text-white">{ticketClsd.title}</Card.Header>
                        <Card.Title
                            className="text-white">{ticketClsd.author + ' | ' + ticketClsd.cohort + ' | ' + ticketClsd.lastUpdated.toString()}</Card.Title>
                        <Card.Text>{ticketClsd.description}</Card.Text>
                        <Card.Text>{ticketClsd.solution}</Card.Text>
                        <Card.Text>{ticketClsd.links}</Card.Text>
                        <Card.Footer className="text-danger">
                            {ticketClsd.lastUpdated.toString()}
                            <ButtonGroup className={"text-success"}>
                                <Button onClick={this.handleClick} className={"text-success"}>
                                    <Link to={"/add-solutions/" + ticketClsd.ticketId}
                                          className={"btn"}>
                                                            <span
                                                                className={"text-white"}> {ticketClsd.status ? 'CLOSED' : 'UPDATED'}</span>
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
                                }
                                </Card.Body>
                            </td>
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

    getLastUpdated(start, end) {
        const seconds = Math.abs((start - end) / 1000);
        console.log(seconds);
        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds ago";
    }
}
