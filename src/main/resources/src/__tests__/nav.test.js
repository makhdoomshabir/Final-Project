import React from "react";
import Navigation from "../Components/nav"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<Navigation/>).toJSON();
    expect(tree).toMatchSnapshot();
})