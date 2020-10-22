import React from "react";
import {Button, Card, CardDeck, NavDropdown} from "react-bootstrap";
import cloud from './images/cloud.png';

const WelcomeOptions = () => {
    return (
    <div>
        <CardDeck id="WelcomeOptions"  >
            <Card>
                {/* <Card.Img variant="top" src={cloud} width="250" height="250" /> */}
                <Card.Body>
                    <Card.Title> <h3>Software Development</h3> </Card.Title>
                </Card.Body>
                <Button> See Tickets</Button>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title> <h3>Cloud Computing</h3> </Card.Title>
                </Card.Body>
                <Button> See Tickets</Button>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title><h3>Devops</h3></Card.Title>
                </Card.Body>
                <Button> See Tickets</Button>
            </Card>
        </CardDeck>
            <CardDeck id="WelcomeOptions"  >
            <Card >
                <Card.Body>
                    <Card.Title><h3>Robotic Process Automation</h3></Card.Title>
                </Card.Body>
                <Button> See Tickets</Button>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title><h3>Pega</h3></Card.Title>
                </Card.Body>
                <Button> See Tickets</Button>
            </Card>
        </CardDeck>
    </div>
    );
};

export default WelcomeOptions;

