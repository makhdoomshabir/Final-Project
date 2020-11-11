import React from "react";
import AddTicketPage from "../Components/Pages/AddTicketPage"
import render from "react-test-renderer";

//snapshot test
test("AddTicketPage Snapshot Test", () => {
    const tree = render.create(<AddTicketPage/>).toJSON();
    expect(tree).toMatchSnapshot();
})