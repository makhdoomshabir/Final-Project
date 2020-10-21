import React from "react";

/*
THIS IS THE DELETE PRODUCT SECTION
 */
export const DeleteTicket = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get('id');
    const req = new XMLHttpRequest();
    req.open("DELETE", "http://localhost:8080/deleteTicket/" + ticket);
    req.onload = () => {
        if (req.status === 200 && req.readyState === 4) {
            console.log("Server Responded with: " + req.responseText);
        } else {
            console.log("Oops...");
        }
    };
    req.send();
}