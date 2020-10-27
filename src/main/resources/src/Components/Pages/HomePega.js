import React from "react";
import ResolvedTickets from "../tickets/ResolvedTickets";
import {Jumbotron} from "react-bootstrap";

const HomePega = () =>  {
    return(

        <div>
            <Jumbotron className="bg-dark text-white" id="HomeSoftwareHeader">
                <h1>Pega</h1>
                <p>
                    Use the Cohort dropdown to filter for tickets specific to your cohort.
                </p>
            </Jumbotron>
            <ResolvedTickets/>
        </div>
    )

}
export default HomePega;