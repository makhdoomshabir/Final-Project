import React from "react";
import Footer from "../Components/Footer"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<Footer/>).toJSON();
    expect(tree).toMatchSnapshot();
})