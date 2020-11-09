import React from "react";
import {Button, Card, CardDeck, NavDropdown} from "react-bootstrap";
import cloud from './images/cloud.png';
import {faPlusSquare, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const WelcomeOptions = () => {
    return (
    <div>
        <CardDeck id="WelcomeOptions"  >
            <Card>
                {/* <Card.Img variant="top" src={cloud} width="250" height="250" /> */}
                <Card.Body>
                    <Card.Title><h3>Azure Devops - (20OctDevOps1)</h3></Card.Title>
                </Card.Body>
                <a href="/Azure-Devops">
                    <Button> <FontAwesomeIcon icon={faArrowRight}/></Button>
                </a>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title><h3>Software BAE - (20OCTBAE2)</h3></Card.Title>
                </Card.Body>
                <a href="/Software-BAE">
                    <Button> See Tickets</Button>
                </a>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title>
                        <h3>
                            SDET - (20OCTSDET3)
                        </h3>
                    </Card.Title>
                </Card.Body>
                <a href="/SDET">
                    <Button> See Tickets</Button>
                </a>
            </Card>
        </CardDeck>
            <CardDeck id="WelcomeOptions"  >
            <Card >
                <Card.Body>
                    <Card.Title>
                        <h3>
                            Cloud Native Engineer - (20SeptCNE)
                        </h3>
                    </Card.Title>
                </Card.Body>
                <a href="/Cloud-Native-Engineer">
                    <Button> See Tickets</Button>
                </a>
            </Card>

            <Card >
                <Card.Body>
                    <Card.Title>
                        <h3>
                            Scala - (20NovSoftware1)
                        </h3>
                    </Card.Title>
                </Card.Body>
                <a>
                    <Button href="/Scala"> See Tickets</Button>
                </a>
            </Card>
        </CardDeck>
    </div>
    );
};

export default WelcomeOptions;


