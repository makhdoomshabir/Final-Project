import React from "react";
import WelcomeOptions from "../Components/WelcomeOptions"
import render from "react-test-renderer";

//snapshot test
test("it matches the snapshot", () => {
    const tree = render.create(<WelcomeOptions/>).toJSON();
    expect(tree).toMatchSnapshot();
})

