import React, { useState, useEffect } from "react";
import {
  Container,
  Thumbnail,
  Title,
  Description,
  DetailContainer,
  GenresContainer,
  TitleContainer,
  FavButton,
} from "./styles/detail";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/api";
import Spinner from "../../components/Spinner";
import Star from "react-star-ratings";
import Tag from "../../components/Tag";
import { BsBookmark, BsFillBookmarkStarFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useMovieContext } from "../../context/movie";

// import { Container } from './styles';

function Detail() {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const { favorites, toggleFavoriteMovie } = useMovieContext();

  console.log(favorites);

  const { id } = useParams();

  useEffect(() => {
    let active = true;
    async function getDetail() {
      const detail = await getMovieById(id);
      if (active) {
        setDetail(detail);
        setLoading(false);
        setFavorite(favorites.some((item) => item.id === detail.id));
        console.log(
          detail,
          favorites.some((item) => item.id === detail.id)
        );
      }
    }
    if (active) {
      getDetail();
    }
    return () => {
      active = false;
    };
  }, [id, favorites]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
        alt="banner"
      />
      <DetailContainer>
        <TitleContainer>
          <Title>{detail.title}</Title>
          <FavButton onClick={() => toggleFavoriteMovie(detail)}>
            <IconContext.Provider
              value={{ style: { color: "#fff", fontSize: 60 } }}
            >
              {favorite ? <BsFillBookmarkStarFill /> : <BsBookmark />}
            </IconContext.Provider>
          </FavButton>
        </TitleContainer>
        <Star
          rating={detail.vote_average}
          starRatedColor="#e7a74e"
          numberOfStars={10}
          name="rating"
        />
        <Description>{detail.overview}</Description>

        <GenresContainer>
          {detail.genres?.map((item) => (
            <Tag key={item.id}>{item.name}</Tag>
          ))}
        </GenresContainer>
      </DetailContainer>
    </Container>
  );
}

export default Detail;
