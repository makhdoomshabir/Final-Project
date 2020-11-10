import React, {Component} from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";
import {Link} from 'react-router-dom';

export default class extends Component {

    initialState = {
        ticketId: '', cohort: '', author: '', title: '', description: '', solution: '', links: ''
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.ticketChange = this.ticketChange.bind(this);
        this.solveTicket = this.solveTicket.bind(this);
    }

    componentDidMount() {
        const url = window.location.href;
        const id = url.charAt(url.length - 1);
        if (id) {
            this.findTicketById(id);
        }
    }

    findTicketById = (ticketId) => {
        axios.get("http://localhost:8080/getTicketById/" + ticketId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        ticketId: response.data.ticketId,
                        cohort: response.data.cohort,
                        author: response.data.author,
                        title: response.data.title,
                        description: response.data.description,
                        solution: response.data.solution,
                        links: response.data.links
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        })
    }

    resetTicket = () => {
        this.setState(() => this.initialState);
    };

    /*
        Here we call the update function
     */
    solveTicket(event) {
        event.preventDefault();

        const tickets = {
            ticketId: this.state.ticketId,
            status: "resolved",
            cohort: this.state.cohort,
            author: this.state.author,
            title: this.state.title,
            description: this.state.description,
            solution: this.state.solution,
            links: this.state.links,
            lastUpdated: new Date()
        };

        axios.put("http://localhost:8080/updateTicket/" + this.state.ticketId, tickets)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true})
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false})
                }
            });
        this.setState(this.initialState);
    }

    ticketChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    ticketList = () => {
        return this.props.history.push("/pega");
    };

    render() {
        const {cohort, author, title, description, solution, links} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Ticket Solved!"} type={"success"}/>
                </div>
                <Form onReset={this.resetTicket} onSubmit={this.solveTicket} id="ticketForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formCohort">
                            <Form.Label>Cohort</Form.Label>
                            <Form.Control required autoComplete="off"
                                          as="select"
                                          defaultValue="Choose..."
                                          name="cohort"
                                          value={cohort}
                                          onChange={this.ticketChange}>
                                <option>Choose...</option>
                                <option>Software Development</option>
                                <option>Cloud Computing</option>
                                <option>DevOps</option>
                                <option>Robotic Process Automation</option>
                                <option>Pega</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                required autoComplete="off"
                                type="text"
                                name="author"
                                value={author}
                                onChange={this.ticketChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Issue Title</Form.Label>
                        <Form.Control
                            required autoComplete="off"
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.ticketChange}/>
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Issue Description</Form.Label>
                        <Form.Control
                            required autoComplete="off"
                            as="textarea"
                            rows="4"
                            name="description"
                            value={description}
                            onChange={this.ticketChange}/>
                    </Form.Group>

                    <Form.Group controlId="formSolution">
                        <Form.Label>Solution</Form.Label>
                        <Form.Control
                            required autoComplete="off"
                            as="textarea"
                            rows="4"
                            name="solution"
                            value={solution}
                            onChange={this.ticketChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLinks">
                        <Form.Label>Links</Form.Label>
                        <Form.Control
                            required autoComplete="off"
                            type="text"
                            name="links"
                            value={links}
                            onChange={this.ticketChange}
                        />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox"
                                    label="I understand that by adding a solution this ticket will be marked as resolved
                                     and the solution will be publicly available on the ticket board."/>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        <Link to={"/pega"}>
                            <FontAwesomeIcon icon={faSave}/> SOLVE
                        </Link>
                    </Button>
                </Form>
        </div>
    );
};
}