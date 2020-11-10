import React from "react";
import {Button, Card, CardDeck, NavDropdown} from "react-bootstrap";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import devops from './images/settings.png';

const WelcomeOptions = () => {
    return (
    <div >
        <CardDeck id="WelcomeOptions"  >
            <Card>
                {/* <Card.Img variant="top" src={cloud} width="250" height="250" /> */}
                <Card.Body>
                    <Card.Title> <h3>Software Development</h3> </Card.Title>
                </Card.Body>
                <a href="/software-development">
                <Button > <FontAwesomeIcon icon={faArrowRight} /></Button>
                </a>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title> <h3>Cloud Computing</h3> </Card.Title>
                </Card.Body>
                <a href="/cloud-computing">
                <Button> See Tickets</Button>
                </a>
            </Card>

            <Card id="cardtest" >
                <Card.Img variant="top" src={devops} width="250" height="250" />
                <Card.Body>
                    <br/>
                    <Card.Title><h3>Devops</h3></Card.Title>
                </Card.Body>
                <a href="/dev-ops">
                <Button> See Tickets</Button>
                </a>
            </Card>

        </CardDeck>
            <CardDeck id="WelcomeOptions"  >
            <Card >
                <Card.Body>
                    <Card.Title><h3>Robotic Process Automation</h3></Card.Title>
                </Card.Body>
                <a href="/robotic-process-automation">
                <Button> See Tickets</Button>
                </a>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title><h3>Pega</h3></Card.Title>
                </Card.Body>
                <a>
                <Button href="/pega"> See Tickets</Button>
                </a>
            </Card>
        </CardDeck>
    </div>
    );
};

export default WelcomeOptions;


