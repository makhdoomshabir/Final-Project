import React from "react";
import Tickets from "../tickets/Tickets";
import {Jumbotron} from "react-bootstrap";

const QueueSysPage = () => {
    return (
        <div>
            <Jumbotron className="bg-dark text-white" id="HomeSoftwareHeader">
                <h1>{window.location.pathname.toUpperCase().replaceAll("/", " ")}</h1>
                <p>
                    Use the Cohort dropdown to filter for tickets specific to your cohort.
                </p>
            </Jumbotron>
            <Tickets/>
        </div>
    )

}
export default QueueSysPage;