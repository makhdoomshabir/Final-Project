import React from "react";
import Tickets from "../tickets/Tickets";
import {Jumbotron} from "react-bootstrap";

const QueueSysPage = () => {
    let removeCharacter = window.location.pathname.toUpperCase().replaceAll("-", " ")
    return (
        <div>
            <Jumbotron className="bg-dark text-white" id="HomeSoftwareHeader">
                <h1>{removeCharacter.replaceAll("/", "")}</h1>
            </Jumbotron>
            <Tickets/>
        </div>
    )

}
export default QueueSysPage;