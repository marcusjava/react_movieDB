import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Home from "../../pages/Home";
import { api } from "../../services/api";
import MockAdapter from "axios-mock-adapter";
import moviesFakeAPI from "../../mock";
//use render for mount component

const mock = new MockAdapter(api, { onNoMatch: "throwException" });

const key = process.env.REACT_APP_MOVIEDB_API_KEY;

const movies = moviesFakeAPI;

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

//test input search
//test click on movie item
// test number of rendered items
describe("Testing Home page", () => {
  it("render Spinner first", () => {
    mock
      .onGet(`/movie/now_playing?api_key=${key}&language=pt-BR&page=1`)
      .reply(200, movies);
    mock
      .onGet(`/movie/popular?api_key=${key}&language=pt-BR&page=1`)
      .reply(200, movies);
    mock
      .onGet(`/movie/top_rated?api_key=${key}&language=pt-BR&page=1`)
      .reply(200, movies);

    const { queryByText, queryByTestId } = render(<Home />);
    screen.debug();
  });
});
