import React, { useEffect, useState } from "react";
import { Container, NoItems } from "./styles/search";
import { searchMovies } from "../../services/api";
import { getListMovies } from "../../utils/movies";
import { useParams, useHistory } from "react-router-dom";
import Category from "../../components/Category";
import Spinner from "../../components/Spinner";

// import { Container } from './styles';

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { term } = useParams();

  const history = useHistory();

  useEffect(() => {
    let isActive = true;
    async function loadMovies() {
      const movies = await searchMovies(term);

      if (isActive) {
        setMovies(getListMovies(15, movies));
        setLoading(false);
      }
    }
    loadMovies();
    return () => {
      isActive = false;
    };
  }, [term]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Container>
      {movies.length ? (
        <Category title="Resultado da pesquisa" items={movies} />
      ) : (
        <NoItems>Sem resultados</NoItems>
      )}
    </Container>
  );
}

export default Search;
