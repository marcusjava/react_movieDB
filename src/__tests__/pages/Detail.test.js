import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { getMovieById } from "../../services/api";
import Detail from "../../pages/Detail";
import RouterData, { BrowserRouter } from "react-router-dom";
import { FirebaseContext } from "../../context/firebase";

jest.mock("../../services/api");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const favoriteMovies = [
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
    backdrop_path: "/Aebz7s8EHQXxHR98J8Vw6QVGggq.jpg",
    genre_ids: [28, 12, 18, 878],
    id: 438631,
    original_language: "en",
    original_title: "Dune",
    overview:
      "Em um futuro distante, planetas são comandados por casas nobres que fazem parte de um império feudal intergalático. Paul Atreides é um jovem homem cuja família toma controle do planeta deserto Arrakis, também conhecido como Duna. A única fonte da especiaria melange, a substância mais importante do cosmos, Arrakis se prova ser um planeta nem um pouco fácil de governar.",
    popularity: 7628.716,
    poster_path: "/krrZTVEqrYwu6vR3f4NWgdSZg8X.jpg",
    release_date: "2021-09-15",
    title: "Duna",
    video: false,
    vote_average: 8.1,
    vote_count: 2392,
  },
];

const detailFavorite = {
  adult: false,
  backdrop_path: "/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg",
  genres: [
    {
      id: 878,
      name: "Ficção científica",
    },
    {
      id: 28,
      name: "Ação",
    },
  ],
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
};

const detailNotFavorite = {
  adult: false,
  backdrop_path: "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
  genres: [
    {
      id: 878,
      name: "Ficção científica",
    },
    {
      id: 28,
      name: "Ação",
    },
  ],
  id: 335983,
  original_language: "en",
  original_title: "Venom",
  overview:
    "O jornalista Eddie Brock desenvolve força e poder sobre-humanos quando seu corpo se funde com o alienígena Venom. Dominado pela raiva, Venom tenta controlar as novas e perigosas habilidades de Eddie",
  popularity: 2479.153,
  poster_path: "/apZJb9kdHXhPu6oDTeztDSd41zw.jpg",
  release_date: "2018-09-28",
  title: "Venom",
  video: false,
  vote_average: 6.8,
  vote_count: 11944,
};

const user = {
  id: "swfn5Hji84TSBQi1JCtAGELj7Ga2",
  displayName: "Marcus Vinicius Melo Bezerra Vinicius",
  email: "buba.sergipe@gmail.com",
  createdAt: {
    seconds: 1635297817,
    nanoseconds: 576000000,
  },
};

const renderWithFirebaseProvider = (user, favorites, id) => {
  return render(
    <BrowserRouter>
      <FirebaseContext.Provider
        value={{
          currentUser: user,
          favoritesMovies: favorites,
          addFavoriteMovieToFirebase: () =>
            favoriteMovies.push(detailNotFavorite),
          removeFavoriteFromFirebase: {},
        }}
      >
        <Detail />
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};

describe("Testing Detail page", () => {
  it("calling API once", () => {
    const id = 335983;
    getMovieById.mockResolvedValueOnce(detailNotFavorite);
    jest.spyOn(RouterData, "useParams").mockReturnValue({ id: id });
    const { getByTestId, queryByTestId } = renderWithFirebaseProvider(
      null,
      favoriteMovies
    );

    expect(getMovieById).toBeCalledTimes(1);
  });
  it("render spinner first", async () => {
    const id = 335983;
    getMovieById.mockResolvedValueOnce(detailNotFavorite);
    jest.spyOn(RouterData, "useParams").mockReturnValue({ id: id });
    const { findByTestId, debug, queryByText } = renderWithFirebaseProvider(
      null,
      favoriteMovies
    );
    //expect(await findByTestId("loading")).not.toBeInTheDocument();
    await waitFor(() => screen.queryByTestId("loading"));

    expect(queryByText(/O jornalista Eddie Brock/i)).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("checking elements are displayed correctly when user is not logged", async () => {
    const id = 335983;
    getMovieById.mockResolvedValueOnce(detailNotFavorite);
    jest.spyOn(RouterData, "useParams").mockReturnValue({ id: id });
    const { debug } = renderWithFirebaseProvider(null, favoriteMovies);

    await waitFor(() => screen.queryByTestId("loading"));
    expect(screen.getByTestId("title").textContent).toBe("Venom");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByAltText("banner")).toBeInTheDocument();
    expect(screen.getByText(/O jornalista Eddie Brock/i)).toBeInTheDocument();
    expect(screen.getByText(/Ficção científica/i)).toBeInTheDocument();
    expect(screen.getByText(/Ação/i)).toBeInTheDocument();
  });

  it("user is logged and movie is not favorite", async () => {
    const id = 335983;
    getMovieById.mockResolvedValueOnce(detailNotFavorite);
    jest.spyOn(RouterData, "useParams").mockReturnValue({ id: id });
    const { debug } = renderWithFirebaseProvider(user, favoriteMovies);

    await waitFor(() => screen.queryByTestId("loading"));
    expect(screen.getByTestId("not-favorite-button")).toBeInTheDocument();
  });
  it("user is logged and movie is favorite", async () => {
    const id = 335983;
    getMovieById.mockResolvedValueOnce(detailFavorite);
    jest.spyOn(RouterData, "useParams").mockReturnValue({ id: id });
    const { debug } = renderWithFirebaseProvider(user, favoriteMovies);
    await waitFor(() => screen.queryByTestId("loading"));
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });
});
