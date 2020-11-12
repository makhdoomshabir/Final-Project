import React from "react";
import AddSolutionPage from "../Components/Pages/AddSolutionPage"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<AddSolutionPage/>).toJSON();
    expect(tree).toMatchSnapshot();
})