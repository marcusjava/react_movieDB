import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Home from "../../pages/Home";
import { api } from "../../services/api";
import MockAdapter from "axios-mock-adapter";
//use render for mount component

const mock = new MockAdapter(api, { onNoMatch: "throwException" });

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

//test input search
//test click on movie item
// test number of rendered items
describe("Testing Home page", () => {
  it("render Spinner first", () => {
    const { queryByText, queryByTestId } = render(<Home />);
    expect(queryByTestId("loading")).toBeInTheDocument();
  });
});
