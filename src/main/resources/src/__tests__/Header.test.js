import React from "react";
import Header from "../Components/Header"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<Header/>).toJSON();
    expect(tree).toMatchSnapshot();
})