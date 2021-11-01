import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { searchMovies } from "../../services/api";
import Search from "../../pages/Search";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
//use render for mount component

jest.mock("../../services/api");
jest.mock("../../utils/movies");

/* jest.mock("../../services/api");
jest.mock("../../utils/movies");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
})); */

const searchedMovies = [
  {
    adult: false,
    backdrop_path: "/pCssRYbILVduCYDgrcRG0T8W4FN.jpg",
    genre_ids: [28, 12, 878, 14],
    id: 246655,
    original_language: "en",
    original_title: "X-Men: Apocalypse",
    overview:
      "Apocalipse, o primeiro mutante de todos, consegue retornar à vida após milhares de anos. Agora, ele sai à procura de seguidores para dominar o mundo. Caberá aos X-Men se unirem para impedir os planos do vilão e evitar uma catástofre mundial.",
    popularity: 80.15,
    poster_path: "/a6OjCxF8DW9huIdAPshWJpO0ldx.jpg",
    release_date: "2016-05-18",
    title: "X-Men: Apocalipse",
    video: false,
    vote_average: 6.5,
    vote_count: 10801,
  },
  {
    adult: false,
    backdrop_path: "/hUPgIibqZlwbhs4N08cPzzc4f5K.jpg",
    genre_ids: [28, 12, 14, 878],
    id: 127585,
    original_language: "en",
    original_title: "X-Men: Days of Future Past",
    overview:
      "Convencido de que os mutantes são uma ameaça para a humanidade, o Dr. Bolivar Trask desenvolve os Sentinelas, gigantescos robôs, que os perseguem impiedosamente. Os poucos sobreviventes têm que viver escondidos. Entre eles está Wolverine, que viaja no tempo, rumo aos anos 1970, a fim de impedir que este futuro trágico para os mutantes se torne realidade.",
    popularity: 63.305,
    poster_path: "/bUm0nSsTA6kfFfZHgNbNFisVe7M.jpg",
    release_date: "2014-05-15",
    title: "X-Men: Dias de um Futuro Esquecido",
    video: false,
    vote_average: 7.5,
    vote_count: 12831,
  },
  {
    adult: false,
    backdrop_path: "/fUoXenTsrdUcgG0sLYbOBouvtTs.jpg",
    genre_ids: [12, 28, 53, 878],
    id: 2080,
    original_language: "en",
    original_title: "X-Men Origins: Wolverine",
    overview:
      "Tentando esquecer seu passado sombrio, Logan, mais conhecido como Wolverine, parece ter encontrado o amor e a felicidade com Kayla Silverfox. Mas a paz de Logan é abalada quando Victor Creed, seu irmão cruel, assassina brutalmente Kayla. A sede de vingança de Logan o leva ao programa Arma X. Ele passa por um processo doloroso para fortalecer seus ossos com adamantium, o que o torna praticamente indestrutível.",
    popularity: 21.523,
    poster_path: "/3xjVVXVXWU8qt1umkeTJd8sImBC.jpg",
    release_date: "2009-04-28",
    title: "X-Men Origens: Wolverine",
    video: false,
    vote_average: 6.3,
    vote_count: 8537,
  },
  {
    adult: false,
    backdrop_path: "/chn9jBtOC65JlOd4IObtNjwX3UK.jpg",
    genre_ids: [99],
    id: 447399,
    original_language: "en",
    original_title: "X-Men: The Mutant Watch",
    overview:
      "Enquanto o senador Kelly se dirige a um comitê do Senado sobre a suposta ameaça mutante, aprendemos sobre a produção do filme X-Men.",
    popularity: 28.053,
    poster_path: "/4FwbuT0NJwcHGRqRc3kpTjgj0jS.jpg",
    release_date: "2001-08-11",
    title: "X-Men: The Mutant Watch",
    video: false,
    vote_average: 7.2,
    vote_count: 152,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [99],
    id: 81946,
    original_language: "en",
    original_title: "X-Men: Production Scrapbook",
    overview: "",
    popularity: 12.95,
    poster_path: "/azRZZO9n8sPbBLgf7qAReU9UXxf.jpg",
    release_date: "2003-11-02",
    title: "X-Men: Production Scrapbook",
    video: false,
    vote_average: 6,
    vote_count: 24,
  },
  {
    adult: false,
    backdrop_path: "/b0yd4iaTw3tsJdnGMi44n6tf4Av.jpg",
    genre_ids: [28, 16, 10770],
    id: 37713,
    original_language: "en",
    original_title: "X-Men: Pryde of the X-Men",
    overview:
      "Pryde of the X-Men (ou Orgulho dos X-Men) foi um episódio piloto de X-Men.\r Assim que a joven Kitty Pryde é convocada para os X-Men, a equipe de heróis mutantes são chamados para a batalha para impedir Magneto e sua Irmandade de Mutantes de derrubar um cometa na Terra.",
    popularity: 6.13,
    poster_path: "/fiATD0LBgBQ5DgjFaqeFt5aG7yL.jpg",
    release_date: "1989-07-01",
    title: "X-Men: Orgulho dos X-Men",
    video: false,
    vote_average: 6.8,
    vote_count: 34,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [99],
    id: 447102,
    original_language: "en",
    original_title: "X-Men: The Uncanny Suspects",
    overview: "",
    popularity: 12.107,
    poster_path: "/iRMG0GdJYUNBV2JBU2218Pf0Ujt.jpg",
    release_date: "2003-02-11",
    title: "X-Men: The Uncanny Suspects",
    video: true,
    vote_average: 6.3,
    vote_count: 28,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [99],
    id: 447161,
    original_language: "en",
    original_title: "X-Men: Reunited",
    overview: "",
    popularity: 5.158,
    poster_path: null,
    release_date: "2014-11-14",
    title: "X-Men: Reunited",
    video: true,
    vote_average: 6.9,
    vote_count: 69,
  },
  {
    adult: false,
    backdrop_path: "/vuuFFMH2SDMCSYcqh8Oylf8ONJK.jpg",
    genre_ids: [99],
    id: 288410,
    original_language: "en",
    original_title: "Chris Claremont's X-Men",
    overview: "",
    popularity: 4.203,
    poster_path: "/lB6ZhOng2XhduM0aID0pzzJLHyQ.jpg",
    release_date: "2018-10-26",
    title: "Chris Claremont's X-Men",
    video: false,
    vote_average: 6.6,
    vote_count: 7,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [99],
    id: 447105,
    original_language: "en",
    original_title: "X-Factor: The Look of X-Men",
    overview: "",
    popularity: 14.08,
    poster_path: "/yqBzDAJH81fH8DIMoiQg4OWhREu.jpg",
    release_date: "2003-02-11",
    title: "X-Factor: The Look of X-Men",
    video: true,
    vote_average: 7.9,
    vote_count: 8,
  },
  {
    adult: false,
    backdrop_path: "/7kURId6slyHNujYpCFm0Z1M3kRt.jpg",
    genre_ids: [28, 878, 12],
    id: 49538,
    original_language: "en",
    original_title: "X-Men: First Class",
    overview:
      "No início dos anos 1960, durante o auge da Guerra Fria, um mutante chamado Charles Xavier conhece um mutante chamado Erik Lehnsherr. Apesar de suas origens muito diferentes - Charles cresceu em uma família rica enquanto Erik perdeu seus pais em Auschwitz -, os dois se tornam grandes amigos. Enquanto o mundo oscila à beira de uma guerra nuclear, Charles e Erik unem forças com outros mutantes para salvar a humanidade. No entanto, um acontecimento separa os dois amigos.",
    popularity: 4.391,
    poster_path: "/AqTCbMhG9X93sly2fvyiu6sHPIS.jpg",
    release_date: "2011-06-01",
    title: "X-Men: Primeira Classe",
    video: false,
    vote_average: 7.3,
    vote_count: 10553,
  },
  {
    adult: false,
    backdrop_path: "/A9fpAjZLqsODM96aI6kx147LPM9.jpg",
    genre_ids: [12, 28, 878],
    id: 36657,
    original_language: "en",
    original_title: "X-Men",
    overview:
      "Eles são filhos do átomo superior, o próximo elo na corrente da evolução. Cada um nasceu com uma mutação genética rara, que na puberdade se manifestou em poderes extraordinários. Em um mundo cheio de ódio e preconceito, eles são temidos por aqueles que não podem aceitar suas diferenças. Liderados por Xavier, os X-Men lutam para proteger um mundo que os teme. Eles estão presos em uma batalha contra um ex-colega e amigo, Magneto, que acredita que os humanos e os mutantes não devem viver juntos.",
    popularity: 1.596,
    poster_path: "/eTAK1gU8vTaHt0W9I6PFYQsdhKP.jpg",
    release_date: "2000-07-13",
    title: "X-Men: O Filme",
    video: false,
    vote_average: 7,
    vote_count: 9111,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [16],
    id: 256361,
    original_language: "en",
    original_title: "Astonishing X-Men: Gifted",
    overview:
      'Ciclope e Emma Frost decidem re-formar os X-Men com o propósito expresso de "surpreender" o mundo. Mas, quando as últimas notícias sobre o gene mutante inesperadamente chegam à mídia, será que isso irá atrapalhar os seus novos planos antes mesmo de começar? Com a demanda para a cura mutante chega quase a um grande nível, os X-Men irão partir com tudo, com aliados inesperados e alguns adversários inesperados também.',
    popularity: 4.1,
    poster_path: "/48MJRUJY3Yf5jyMLbJFAFmQkAdz.jpg",
    release_date: "2010-09-28",
    title: "Astonishing X-Men: Gifted",
    video: false,
    vote_average: 6.8,
    vote_count: 6,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [16],
    id: 222456,
    original_language: "en",
    original_title: "Astonishing X-Men: Torn",
    overview: "",
    popularity: 3.467,
    poster_path: "/nCI7NAqzXxSj9QApk6BAFPhbH4T.jpg",
    release_date: "2012-08-14",
    title: "Astonishing X-Men: Torn",
    video: false,
    vote_average: 10,
    vote_count: 1,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [99],
    id: 447162,
    original_language: "en",
    original_title: "X-Men: Unguarded",
    overview: "",
    popularity: 2.273,
    poster_path: null,
    release_date: "2015-07-14",
    title: "X-Men: Unguarded",
    video: true,
    vote_average: 7.5,
    vote_count: 16,
  },
];

const renderWithProviders = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  console.log("I am route inside renderWithProviders Wrapper:", route);
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

describe("Testing Search page", () => {
  it("render spinner first", async () => {
    searchMovies.mockResolvedValue(searchedMovies);
    //getListMovies.mockResolvedValue(searchedMovies);
    const { debug } = renderWithProviders(
      <Route path="/search/:term">
        <Search />
      </Route>,
      {
        route: "/search/x-men",
      }
    );
    expect(searchMovies).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() => screen.queryByTestId("loading"));
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });
  it("render list items correctly", async () => {
    searchMovies.mockResolvedValue(searchedMovies);
    //getListMovies.mockResolvedValue(searchedMovies);
    const { debug, container } = renderWithProviders(
      <Route path="/search/:term">
        <Search />
      </Route>,
      {
        route: "/search/x-men",
      }
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() => screen.queryByTestId("loading"));
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.getByText(/resultado da pes/i).textContent).toEqual(
      "Resultado da pesquisa - x-men"
    );
    const items = screen.queryAllByAltText("movie image");
    expect(items.length).toBe(15);
    debug(items);
  });
});
