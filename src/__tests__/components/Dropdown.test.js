import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "../../components/Dropdown";
import { FirebaseContext } from "../../context/firebase";
import { BrowserRouter } from "react-router-dom";

//use render for mount component

const mockFavorites = [
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
  {
    adult: false,
    backdrop_path: "/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg",
    genre_ids: [878, 28],
    id: 580490,
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
];

const renderWithFirebaseProvider = (user, favorites) => {
  return render(
    <BrowserRouter>
      <FirebaseContext.Provider
        value={{
          currentUser: user,
          favoritesMovies: favorites,
          removeFavoriteFromFirebase: (id) =>
            favorites.filter((item) => item.id !== id),
        }}
      >
        <Dropdown />
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};

afterEach(cleanup);

describe("test dropdown component", () => {
  it("render initially dropdown closed", () => {
    const { queryByTestId } = renderWithFirebaseProvider(
      <Dropdown />,
      mockFavorites
    );
    expect(queryByTestId("dropdown-list")).not.toBeInTheDocument();
  });

  it("opening dropdown", () => {
    const { queryByTestId } = renderWithFirebaseProvider(
      <Dropdown />,
      mockFavorites
    );
    fireEvent.click(queryByTestId("dropdown"));
    expect(queryByTestId("dropdown-list")).toBeInTheDocument();
  });

  it("no items list", () => {
    const { queryByTestId, getByText } = renderWithFirebaseProvider(
      <Dropdown />,
      0
    );
    fireEvent.click(queryByTestId("dropdown"));
    expect(queryByTestId("dropdown-list")).toBeInTheDocument();
    expect(getByText(/sem items/i)).toBeInTheDocument();
  });

  it("two items in the dropdown list", () => {
    const { queryByTestId, getByText, queryByText, debug } =
      renderWithFirebaseProvider(<Dropdown />, mockFavorites);

    fireEvent.click(queryByTestId("dropdown"));
    expect(queryByTestId("dropdown-list")).toBeInTheDocument();
    expect(queryByText(/sem items/i)).toBeNull();
    expect(getByText("2").textContent).toEqual("2");
  });
});
