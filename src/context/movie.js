import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavoriteMovie = (movie) => {
    //firebase here
    if (favorites.some((item) => item.id === movie.id)) {
      setFavorites((oldFavorites) =>
        oldFavorites.filter((item) => item.id !== movie.id)
      );
      return;
    }
    setFavorites([...favorites, movie]);
  };

  return (
    <MovieContext.Provider value={{ favorites, toggleFavoriteMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
