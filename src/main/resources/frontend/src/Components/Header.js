import React from 'react';
import {Jumbotron} from "react-bootstrap";

const Header = () => {
    return (
        <div>
            <Jumbotron id="homepageHeader" className="bg-dark text-white">
                <h1>Got a Problem? Leave a Ticket.</h1>
                <blockquote className="bg-dark text-white">
                    <p>
                        Perhaps you're finding certain concepts in the academy difficult to understand or maybe you've
                        hit
                        a roadblock in your project and you need help from a trainer. Leave a ticket with your issue
                        described
                        and someone will get back to you.
                    </p>

                    <p>
                        Alternatively look through the resolved tickets and their solutions to see if your issue has
                        already been
                        resolved.
                    </p>
                    <footer className="blockquote-footer">
                        <h4>QA Academy</h4>
                    </footer>
                </blockquote>
            </Jumbotron>
        </div>
    );
};

export default Header;