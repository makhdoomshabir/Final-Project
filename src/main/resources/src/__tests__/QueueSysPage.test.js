import React from "react";
import QueueSysPage from "../Components/Pages/QueueSysPage"
import render from "react-test-renderer";

//snapshot test
test("QueueSysPage Snapshot Test", () => {
    const tree = render.create(<QueueSysPage/>).toJSON();
    expect(tree).toMatchSnapshot();
})