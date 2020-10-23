import React, {Component} from 'react';
// import {Card, Button} from "react-bootstrap";
import axios from "axios";

export default class ResolvedTickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ticket: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/allTickets")
            .then(response => console.log(response.data))
            .then((data) => {
                this.setState({ticket: data});
            });
    }

    render() {
        return (
            <>
                {
                    // this.state.ticket.map((ticket) => {
                    //     <div key={ticket.id}>
                    //         <Card style={{width: '25rem'}}>
                    //             <Card.Body>
                    //                 <Card.Title>{this.state.tickets.title}</Card.Title>
                    //                 <Card.Subtitle className="mb-2 text-muted">{this.state.tickets.author}</Card.Subtitle>
                    //                 <Card.Text>{this.state.tickets.description}</Card.Text>
                    //                 <Button variant="primary">Update</Button>
                    //                 <Button variant="primary">Add Solution</Button>
                    //                 <Button variant="primary">Delete</Button>
                    //             </Card.Body>
                    //         </Card>
                    //     </div>
                })
                }
            </>
        );
    }
}
