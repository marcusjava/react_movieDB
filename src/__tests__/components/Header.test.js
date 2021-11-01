import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Header from "../../components/Header";
import { FirebaseContext } from "../../context/firebase";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Firebase } from "../../utils/firebase";
import { authMock } from "../../utils/firebaseFake";

Firebase.auth = authMock;

const Home = () => <h1>Home page</h1>;

const renderWithFirebaseProvider = (user) => {
  return render(
    <FirebaseContext.Provider
      value={{
        currentUser: user,
        favoritesMovies: [
          {
            adult: false,
            backdrop_path: "/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg",
            genre_ids: [878, 28],
            id: 580489,
            original_language: "en",
            original_title: "Venom: Let There Be Carnage",
            overview:
              "O relacionamento entre Eddie e Venom (Tom Hardy) está evoluindo. Buscando a melhor forma de lidar com a inevitável simbiose, esse dois lados descobrem como viver juntos e, de alguma forma, se tornarem melhores juntos do que separados.",
            popularity: 7933.523,
            poster_path: "/1BdFUd1FAgo0tLHejVQb5oeqevz.jpg",
            release_date: "2021-09-30",
            title: "Venom: Tempo de Carnificina",
            video: false,
            vote_average: 7,
            vote_count: 1106,
          },
        ],
      }}
    >
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
};

describe("Testing Header component", () => {
  it("show login when user is not logged in", () => {
    const { getByText } = renderWithFirebaseProvider(null);

    expect(getByText(/Login/i).textContent).not.toBeNull();
  });

  it("show welcome when user is logged in and button for loggoff", () => {
    renderWithFirebaseProvider({
      displayName: "Marcus Vinicius",
    });

    expect(screen.getByText(/Seja bem vindo/i)).toBeInTheDocument();
    expect(screen.getByTestId("logout")).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });
  it("click on home link and redirect to home page", () => {
    renderWithFirebaseProvider({
      displayName: "Marcus Vinicius",
    });

    const homeLink = screen.getByTestId("home-link");
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    expect(screen.getByText(/home page/i).textContent).toEqual("Home page");
  });
  it("click on logout button", () => {
    const { debug } = renderWithFirebaseProvider({
      displayName: "Marcus Vinicius",
    });
    expect(screen.getByText(/Seja bem vindo/i)).toBeInTheDocument();
    expect(screen.getByTestId("logout")).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    const logoutButton = screen.getByTestId("logout");
    userEvent.click(logoutButton);
  });
});
