import React, {Component} from 'react';
import { Form, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export default class extends Component{
    constructor(props) {
        super(props);
        this.state= this.initialState;
        this.ticketChange = this.ticketChange.bind(this);
        this.submitTicket = this.submitTicket.bind(this);
    }

    initialState = {
        cohort:'', author:'', title:'', description:'', links:''
    }

    resetTicket = () => {
        this.setState(() => this.initialState);
    }

    submitTicket(event) {
        event.preventDefault();

        const tickets = {
                cohort: this.state.cohort,
                author: this.state.author,
                title: this.state.title,
                description: this.state.description,
                links: this.state.links
        };

        axios.post("http://localhost:8080/createTicket", tickets)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Ticket Saved Successfully")
                }
            })
    }

    ticketChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    render() {
        const {cohort, author, title, description, links} = this.state;

        return (
            <div>
                <Form onReset={this.resetTicket} onSubmit={this.submitTicket} id="ticketForm">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formCohort" >
                            <Form.Label>Cohort</Form.Label>
                            <Form.Control
                                required autoComplete="off"
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

                    <Form.Group controlId="formLinks">
                        <Form.Label>Links</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            type="text"
                            name="links"
                            value={links}
                            onChange={this.ticketChange}/>
                        <button> Add Link</button>
                    </Form.Group>


                    <Form.Group ControlID="formGridCheckbox">
                        <Form.Check type="checkbox"
                                    label="I understand that my Issue will be posted to the public ticket board"/>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        <FontAwesomeIcon icon={faPlusSquare} /> Add Ticket

                    </Button>{'  '}

                    <Button variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} /> Reset Form
                    </Button>

                </Form>
            </div>
        );
    };
};
