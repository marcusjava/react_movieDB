import React from "react";
import { Container, Thumbnail } from "./styles/banner";

// import { Container } from './styles';

function Banner({ data, redirectToDetailPage }) {
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
        alt="banner"
        onClick={() => redirectToDetailPage(data.id)}
      />
    </Container>
  );
}

export default Banner;
