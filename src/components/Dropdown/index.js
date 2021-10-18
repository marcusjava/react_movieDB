import React, { useState } from "react";
import { useMovieContext } from "../../context/movie";
import FavoriteItem from "../FavoriteItem";

import { Container, Count, Dropdown, Items, NoItems } from "./styles/dropdown";
import { BsStar } from "react-icons/bs";
import { IconContext } from "react-icons";

function DropdownFavorites() {
  const [open, setOpen] = useState(false);

  const { favorites, toggleFavoriteMovie } = useMovieContext();
  return (
    <>
      <Container onClick={() => setOpen((prev) => !prev)}>
        <IconContext.Provider
          value={{ style: { color: "#fff", fontSize: 60 } }}
        >
          <BsStar />
        </IconContext.Provider>
        <Count>{favorites.length}</Count>
      </Container>
      {open && (
        <Dropdown>
          <Items>
            {favorites.length ? (
              favorites.map((item) => (
                <FavoriteItem
                  key={item.id}
                  item={item}
                  remove={() => toggleFavoriteMovie(item)}
                />
              ))
            ) : (
              <NoItems>Sem items</NoItems>
            )}
          </Items>
        </Dropdown>
      )}
    </>
  );
}

export default DropdownFavorites;
