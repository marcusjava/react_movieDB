import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Search from "../../components/Search";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const SearchPage = () => <h1>Search Page</h1>;

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <Search />
      <Switch>
        <Route path="/search/:term" component={SearchPage} />
      </Switch>
    </BrowserRouter>
  );
};

describe("testing search movie component", () => {
  it("checking elements are displayed", () => {
    renderComponent();
    expect(screen.getByLabelText("search-btn")).toBeInTheDocument();
    expect(screen.getByLabelText("search-input")).toBeInTheDocument();
  });
  it("button disabled when input is empty", () => {
    renderComponent();
    const searchButton = screen.getByLabelText("search-btn");
    const searchInput = screen.getByLabelText("search-input");
    expect(searchButton).toBeDisabled();
    userEvent.type(searchInput, "X-men");
    expect(searchButton).not.toBeDisabled();
  });

  it("redirecting to search page", () => {
    const { debug } = renderComponent();
    const searchButton = screen.getByLabelText("search-btn");
    const searchInput = screen.getByLabelText("search-input");
    expect(searchButton).toBeDisabled();
    userEvent.type(searchInput, "X-men");
    expect(searchButton).not.toBeDisabled();
    userEvent.click(searchButton);
    expect(screen.getByText(/search/i).textContent).toBe("Search Page");
  });
});
