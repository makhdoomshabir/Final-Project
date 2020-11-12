import React from "react";
import MyToast from "../Components/MyToast"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<MyToast/>).toJSON();
    expect(tree).toMatchSnapshot();
})