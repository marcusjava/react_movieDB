import React from "react";
import { Container } from "./styles/header";
import { SiThemoviedatabase } from "react-icons/si";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import DropdownFavorites from "../../components/Dropdown";

function Header() {
  return (
    <Container>
      <Link to="/">
        <IconContext.Provider
          value={{ style: { color: "#fff", fontSize: 60 } }}
        >
          <SiThemoviedatabase />
        </IconContext.Provider>
      </Link>
      <DropdownFavorites />
    </Container>
  );
}

export default Header;
