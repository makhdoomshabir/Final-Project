import React from "react";
import AddTicketForm from "../Components/tickets/AddTicketForm"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<AddTicketForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})