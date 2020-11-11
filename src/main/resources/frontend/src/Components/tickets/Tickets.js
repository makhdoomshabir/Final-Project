import React, {Component} from 'react';
import {Button, ButtonGroup, Card, FormControl, InputGroup, Tooltip, OverlayTrigger, Nav, Tab} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStepBackward, faFastBackward, faFastForward, faTimes, faSearch, faTrash, faPlusSquare, faEdit
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import {Link} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';

export default class Tickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            keyword: '',
            cohortFilter: window.location.pathname.replaceAll("/", ""),
            currentPage: 1,
            ticketsPerPage: 5,
            status: true,
            runningTime: 0,
            isResolved: true
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9500/allTickets")
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
    }

    deleteTicket = (ticketId) => {
        axios.delete("http://localhost:9500/deleteTicket/" + ticketId)
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

    /*

        Pagination

     */

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    }

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.tickets.length / this.state.ticketsPerPage)) {
            this.setState({
                currentPage: (Math.ceil(this.state.tickets.length / this.state.ticketsPerPage))
            })
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.tickets.length / this.state.ticketsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };


    /*

     Filtering through data by keyword

     */
    searchChange = event => {
        this.setState({
            "keyword": event.target.value
        })
    }

    cancelSearch = () => {
        this.setState({
            "keyword": " "
        })
    }

    searchData = () => {
        axios.get("http://localhost:9500/allTickets?keyword=" + this.state.keyword)
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

    /*

    Conditional Rendering of tickets based on tab selected

     */

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

                                <span className={"text-red"}>
                                    Last Updated: <ReactTimeAgo date={ticket.lastUpdated} locale="en-US"
                                                                timeStyle="round"/>
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-white">
                                    {ticket.title}
                                </Card.Title>

                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>{ticket.links}</Card.Text>
                                <Card.Subtitle>
                                    <div style={{"float": "left"}}>
                                        Posted: {ticket.ticketDate.toString()}
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
                                            <Button size="sm">
                                                <Link to={"/update-ticket/" + ticket.ticketId} className={"btn"}>
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
                                            <Button size="sm">
                                                <Link to={"/add-solutions/" + ticket.ticketId} className={"btn"}>
                                                    <FontAwesomeIcon icon={faPlusSquare}/>
                                                </Link>
                                            </Button>
                                        </OverlayTrigger>
                                        {' '}
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{show: 250, hide: 400}}
                                            overlay={renderDeleteTooltip}
                                        >
                                            <Button size="sm" key={ticket.ticketId}
                                                    onClick={() => this.deleteTicket(ticket.ticketId)}>
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
                    {this.state.tickets.filter(
                        (ticket) => {
                            return ticket.status.toLowerCase() === "resolved";
                        }
                    ).map(ticketClsd => (
                        <div key={ticketClsd.ticketId}>
                            <Card.Header>
                                <div>
                                    {ticketClsd.author}
                                </div>

                                <span className={"text-red"}>
                                    Resolved: <ReactTimeAgo date={ticketClsd.lastUpdated} locale="en-US"
                                                             timeStyle="round"/>
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-white">
                                    {ticketClsd.title}
                                </Card.Title>

                                <Card.Text>{ticketClsd.description}</Card.Text>
                                <Card.Text>
                                    Solution :
                                    <br/>
                                    {ticketClsd.solution}
                                </Card.Text>
                                <Card.Text>{ticketClsd.links}</Card.Text>
                                <Card.Subtitle>
                                    <div style={{"float": "left"}}>
                                        Posted: {ticketClsd.ticketDate}
                                    </div>
                                </Card.Subtitle>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div>
                                    <ButtonGroup>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{show: 250, hide: 400}}
                                            overlay={renderSolutionTooltip}
                                        >
                                            <Button size="sm">
                                                <Link to={"/add-solutions/" + ticketClsd.ticketId} className={"btn"}>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Link>
                                            </Button>
                                        </OverlayTrigger>
                                        {' '}
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{show: 250, hide: 400}}
                                            overlay={renderDeleteTooltip}
                                        >
                                            <Button size="sm" key={ticketClsd.ticketId}
                                                    onClick={() => this.deleteTicket(ticketClsd.ticketId)}>
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
        }
    }


    render() {

        const {tickets, currentPage, ticketsPerPage} = this.state;
        const lastIndex = currentPage * ticketsPerPage;
        const firstIndex = lastIndex - ticketsPerPage;
        const currentTickets = tickets.slice(firstIndex, lastIndex);
        const totalPages = tickets.length / ticketsPerPage;
        const {status, runningTime} = this.state;


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
                    <MyToast show={this.state.show} message={"Ticket Removed Successfully"} type={"danger"}/>
                </div>

                <Card id="resolvedTicketsCardDeck" className={"bg-dark text-white"}>
                    <Card.Header>

                        <Nav variant="tabs">
                            <Nav.Item>
                                <Button onClick={this.unresolved}><h2>Unresolved</h2></Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={this.resolve}><h2>Resolved</h2></Button>
                            </Nav.Item>
                        </Nav>

                    </Card.Header>


                    <Card.Header className={"mb-2"} type={"danger"}>
                        <div style={{"float": "right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="keyword"
                                             className={"bg-dark text-white"}
                                             onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button"
                                            onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-info" type="button"
                                            onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>

                    {tickets.length === 0 ?
                        <h3> No Tickets </h3>
                        :
                        <table>
                            <td>
                                {this.displayResolved()}
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
                                <FormControl style={pageNumCss}
                                             className={"bg-dark"}
                                             name="currentPage"
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
