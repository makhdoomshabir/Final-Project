import React from "react";
import AddTicketForm from '../tickets/AddTicketForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

const AddTicketPage = () => {
    return (
        <div>
            <h1 id="pageheader"> New Ticket</h1>
            <AddTicketForm/>

        </div>
    )

}
export default AddTicketPage;