import React from "react";
import AddSolution from "../Components/tickets/AddSolution"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<AddSolution/>).toJSON();
    expect(tree).toMatchSnapshot();
})