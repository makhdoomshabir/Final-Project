import React from "react";
import {Jumbotron, Button} from "react-bootstrap";

const HomeSoftware = () =>  {
    return(
        <div>
            <Jumbotron className="bg-dark text-white" id="HomeSoftwareHeader">
                <h1>Software Development</h1>
                <p>
                    Use the Cohort dropdown to filter for tickets specific to your cohort.
                </p>
            </Jumbotron>
        </div>
    )

}
export default HomeSoftware;