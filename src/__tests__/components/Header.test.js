import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../components/Header";
import { FirebaseContext } from "../../context/firebase";
import { BrowserRouter } from "react-router-dom";

//use render for mount component

const renderWithFirebaseProvider = (user) => {
  return render(
    <BrowserRouter>
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
        <Header />
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};

afterEach(cleanup);

describe("Testing Header component", () => {
  it("show login when user is not logged in", () => {
    const { getByText } = renderWithFirebaseProvider(null);

    expect(getByText(/Login/i).textContent).not.toBeNull();
  });

  it("show welcome when user is logged in and button for loggoff", () => {
    const { getByText, getByTestId, queryByText } = renderWithFirebaseProvider({
      displayName: "Marcus Vinicius",
    });

    expect(getByText(/Seja bem vindo/i)).toBeInTheDocument();
    expect(getByTestId("logout")).toBeInTheDocument();
    expect(queryByText(/Login/i)).not.toBeInTheDocument();
  });
});
