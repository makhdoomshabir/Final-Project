import React from "react";
import Tickets from "../Components/tickets/Tickets"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<Tickets/>).toJSON();
    expect(tree).toMatchSnapshot();
})