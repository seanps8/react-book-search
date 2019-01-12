import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        Google Book Search
      </a>
      <Link className="search" to={"/books"}>
        Search
      </Link>
      <Link className="saved" to={"/savedbooks"}>
        Saved Books
      </Link>
    </nav>
  );
}

export default Nav;