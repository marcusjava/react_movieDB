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
import { useFirebase } from "../../context/firebase";
import Loader from "react-loader-spinner";

// import { Container } from './styles';

function Detail() {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const {
    currentUser,
    addFavoriteMovieToFirebase,
    removeFavoriteFromFirebase,
    favoritesMovies,
    firebaseLoading,
  } = useFirebase();

  const { id } = useParams();

  console.log(currentUser);

  useEffect(() => {
    let active = true;
    async function getDetail() {
      const detail = await getMovieById(id);
      if (active) {
        console.log(detail);
        setDetail(detail);
        if (currentUser !== null) {
          setFavorite(favoritesMovies.some((item) => item.id === detail.id));
        }

        setLoading(false);
      }
    }
    if (active) {
      getDetail();
    }
    return () => {
      active = false;
    };
  }, [id, favoritesMovies, currentUser]);

  if (loading) {
    return (
      <div data-testid="loading">
        <Spinner />
      </div>
    );
  }
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
        alt="banner"
      />
      <DetailContainer>
        <TitleContainer>
          <Title data-testid="title">{detail.title}</Title>
          {currentUser && (
            <FavButton
              onClick={() =>
                favorite
                  ? removeFavoriteFromFirebase(detail.id)
                  : addFavoriteMovieToFirebase(detail)
              }
            >
              <IconContext.Provider
                value={{ style: { color: "#fff", fontSize: 60 } }}
              >
                {firebaseLoading ? (
                  <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={60}
                    width={60}
                    visible={firebaseLoading}
                  />
                ) : favorite ? (
                  <BsFillBookmarkStarFill />
                ) : (
                  <BsBookmark />
                )}
              </IconContext.Provider>
            </FavButton>
          )}
        </TitleContainer>
        <Star
          rating={detail.vote_average}
          starRatedColor="#e7a74e"
          numberOfStars={10}
          name="rating"
        />
        <Description>{detail.overview}</Description>

        <GenresContainer data-testid="genres">
          {detail.genres?.map((item) => (
            <Tag key={item.id} data-testid={`${item.name}-tag`}>
              {item.name}
            </Tag>
          ))}
        </GenresContainer>
      </DetailContainer>
    </Container>
  );
}

export default Detail;
