import React, {Component, useEffect, useState} from 'react';
import {
    Button,
    Card,
    FormControl,
    InputGroup,
    Table,
    Nav,
    Tooltip,
    OverlayTrigger,
    ButtonGroup, Form
} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStepBackward, faFastBackward, faFastForward, faPlusSquare, faTrash, faEdit, faSearch, faTimes, faList
} from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter as Router} from "react-router-dom";

export default class ResolvedTickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            keyword:'',
            currentPage: 1,
            ticketsPerPage: 5 ,
        };

    }



    componentDidMount() {
        axios.get("http://localhost:8080/allTickets?keyword=")
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

    changePage = event => {
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        })
    }

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

    render() {

        //tooltips
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

        //Pageation

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
            <Card id="resolvedTicketsCardDeck" className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link href="#first"><h3>Open Tickets</h3></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link"><h3>Resolved Tickets</h3></Nav.Link>
                    </Nav.Item>
                </Nav>
                    <div style={{"float": "right"}}>
                        <InputGroup size= "sm">
                            <FormControl placeholder="Search" name="keyword" className={"bg-dark text-white"}
                            onChange={this.searchChange}/>
                            <InputGroup.Append>
                                <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                                <Button size="sm" variant="outline-info" type="button" onClick={this.cancelSearch}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
            </Card.Header>
                <Card.Body>
                    <Table border hover striped variant="dark">
                        <thead>
                        <tr>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Cohort</td>
                            <td>Author</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">No Unresolved Tickets</td>
                            </tr>
                            :
                            currentTickets.map((ticket) => (
                                <tr key={ticket.id}>

                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.cohort}</td>
                                    <td>{ticket.author}</td>
                                    <td>
                                    <ButtonGroup>
                                    <OverlayTrigger
                                    placement="bottom"
                                    delay={{show: 250, hide: 400}}
                                    overlay={renderEditTooltip}
                                    >
                                    <Button size="sm"><FontAwesomeIcon icon={faEdit} /></Button>
                                    </OverlayTrigger>

                                    <Router>
                                    <a href="/add-solution">
                                    <OverlayTrigger
                                    placement="bottom"
                                    delay={{show: 250, hide: 400}}
                                    overlay={renderSolutionTooltip}
                                    >
                                    <Button size="sm">
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                    </Button>
                                    </OverlayTrigger>
                                    </a>
                                    </Router>
                                    <OverlayTrigger
                                    placement="bottom"
                                    delay={{show: 250, hide: 400}}
                                    overlay={renderDeleteTooltip}
                                    >
                                    <Button size="sm" key={ticket.ticketId}
                                    onClick={() => this.deleteTicket(ticket.ticketId)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    </OverlayTrigger>
                                    </ButtonGroup>
                                    </td>

                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>

                <Card.Footer>
                    <div style={{"float":"left"}}>
                    Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1}
                                onClick={this.firstPage}>
                                <FontAwesomeIcon icon={faFastBackward} /> First
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1}
                                onClick={this.prevPage}>
                                <FontAwesomeIcon icon={faStepBackward} /> Prev
                                </Button>
                            </InputGroup.Prepend>
                        <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                        onChange={this.changePage}/>
                        <InputGroup.Append>
                            <Button type="button" variant="outline-info" disabled={currentPage === totalPages}
                            onClick={this.nextPage}>
                            <FontAwesomeIcon icon={faFastForward} /> Next
                            </Button>
                            <Button type="button" variant="outline-info" disabled={currentPage === totalPages}
                            onClick={this.lastPage}>
                            <FontAwesomeIcon icon={faStepBackward} /> Last
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
