import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Home from "../../pages/Home";

//use render for mount component

afterEach(cleanup);

//test input search
//test click on movie item
// test number of rendered items
describe("Testing Home page", () => {
  const sum = (n1, n2) => n1 + n2;
  it("sum 2 + 2", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
