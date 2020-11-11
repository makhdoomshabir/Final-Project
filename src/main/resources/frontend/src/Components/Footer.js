import React from "react";
import {Navbar, Container, Col} from "react-bootstrap";

const Footer = () => {
    let fullyear = new Date().getFullYear();
    return (
        <div>
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>
                            &copy; {fullyear}-{fullyear + 1} Team 1 All Rights Reserved
                        </div>
                    </Col>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer;