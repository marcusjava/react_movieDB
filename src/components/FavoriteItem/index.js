import React from "react";

import {
  Container,
  Thumbnail,
  Description,
  DescriptionContainer,
  Button,
  ButtonLink,
  ButtonContainer,
} from "./styles/favorite-item";

function FavoriteItem({ item: { poster_path, id, title }, remove }) {
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="banner"
      />
      <DescriptionContainer>
        <Description>{title}</Description>
        <ButtonContainer>
          <Button danger onClick={() => remove()}>
            Remover
          </Button>
          <ButtonLink to={`/movie/${id}`}>Ir</ButtonLink>
        </ButtonContainer>
      </DescriptionContainer>
    </Container>
  );
}

export default FavoriteItem;
