import React, {Component} from 'react';
import {Button, Col, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from "../MyToast";


export default class extends Component {

    initialState = {
        ticketId: '', cohort: '', author: '', title: '', description: '', links: ''
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.ticketChange = this.ticketChange.bind(this);
        this.submitTicket = this.submitTicket.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
    }

    componentDidMount() {
        const url = window.location.href;
        const id = url.charAt(url.length - 1);
        if (id) {
            this.findTicketById(id);
        }
    }

    findTicketById = (ticketId) => {
        axios.get("http://localhost:9500/getTicketById/" + ticketId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        ticketId: response.data.ticketId,
                        cohort: response.data.cohort,
                        author: response.data.author,
                        title: response.data.title,
                        description: response.data.description,
                        links: response.data.links,
                        lastUpdated: response.data.lastUpdated,
                        ticketDate: response.data.ticketDate
                    });
                    this.setState({
                        cohortFilter: response.data.cohort
                    })
                }
            }).catch((error) => {
            console.error("Error - " + error);
        })
    }

    resetTicket = () => {
        this.setState(() => this.initialState);
    };

    submitTicket(event) {
        event.preventDefault();

        const tickets = {
            ticketDate: new Date(),
            cohort: this.state.cohort,
            author: this.state.author,
            title: this.state.title,
            description: this.state.description,
            links: this.state.links,
            lastUpdated: new Date()
        };

        axios.post("http://localhost:9500/createTicket", tickets)
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

    /*
        Here we call the update function
     */
    updateTicket(event) {
        event.preventDefault();

        const tickets = {
            ticketId: this.state.ticketId,
            ticketDate: this.state.ticketDate,
            cohort: this.state.cohort,
            author: this.state.author,
            title: this.state.title,
            description: this.state.description,
            links: this.state.links,
            lastUpdated: new Date()
        };

        axios.put("http://localhost:9500/updateTicket/" + this.state.ticketId, tickets)
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

    ticketList = (cohort) => {
        return window.location.href = "/" + cohort;
    };

    render() {
        const {cohort, author, title, description, links} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={"Ticket " + this.state.ticketId ? " UPDATED " : " CREATED " + " Successfully"}
                             type={"success"}/>
                </div>
                <Form onReset={this.resetTicket} onSubmit={this.state.ticketId ? this.updateTicket : this.submitTicket}
                      id="ticketForm">
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
                                <option value={"Azure-Devops"}>Azure Devops - (20OctDevOps1)</option>
                                <option value={"Software-BAE"}>Software BAE - (20OCTBAE2)</option>
                                <option value={"SDET"}>SDET - (20OCTSDET3)</option>
                                <option value={"Cloud-Native-Engineer"}>Cloud Native Engineer - (20SeptCNE)</option>
                                <option value={"Scala"}>Scala - (20NovSoftware1)</option>
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

                    <Form.Group controlId="formLinks">
                        <Form.Label>Links</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            type="text"
                            name="links"
                            value={links}
                            onChange={this.ticketChange}/>
                    </Form.Group>

                    <Button variant="success" type="submit" onClick={() => this.ticketList(cohort)}>
                        <FontAwesomeIcon icon={faSave}/> {this.state.ticketId ? "UPDATE" : "SAVE"}
                    </Button>{'  '}
                    <Button variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo}/> Reset Form
                    </Button>

                </Form>
            </div>
        );
    };
};
