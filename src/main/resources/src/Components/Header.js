import React from 'react';
import {Jumbotron} from "react-bootstrap";

const Header = () => {
  return (
    <div>
        <Jumbotron id="homepageHeader">
            <h1>Got a Problem? Leave a Ticket</h1>
            <p>
                Perhaps you're finding certain concepts in the academy difficult to understand or maybe you're you've
                a roadblock in your project and you need help from a trainer. Leave a ticket with your issue described
                and someone will get back to you.

                Alternatively look through the resolved tickets and their solution to see if your issue has already been
                resolved.
            </p>
        </Jumbotron>
    </div>
  );
};

export default Header;