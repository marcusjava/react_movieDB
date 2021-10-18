import {
  Container,
  Thumbnail,
  Title,
  RatingContainer,
  Rate,
  TitleContainer,
} from "./styles/movie";
import { IconContext } from "react-icons";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const Movie = ({ data: { id, title, poster_path, vote_average } }) => {
  return (
    <Container>
      <Link to={`/movie/${id}`}>
        <Thumbnail src={`https://image.tmdb.org/t/p/original${poster_path}`} />
      </Link>
      <TitleContainer>
        <Link to={`/movie/${id}`}>
          <Title>{title}</Title>
        </Link>
      </TitleContainer>
      <RatingContainer>
        <IconContext.Provider
          value={{ style: { color: "#E7A74E", fontSize: 30 } }}
        >
          <AiFillStar />
        </IconContext.Provider>
        <Rate>{vote_average}/10</Rate>
      </RatingContainer>
    </Container>
  );
};

export default Movie;
