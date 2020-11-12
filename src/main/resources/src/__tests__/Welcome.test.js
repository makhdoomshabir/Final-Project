import React from "react";
import Welcome from "../Components/Pages/Welcome"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<Welcome/>).toJSON();
    expect(tree).toMatchSnapshot();
})