import React from "react";
import style from "./SearchBox.module.css";
import searchIcon from "../img/search.png";

const SearchBox = (props) => {
  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Serach"
          value={props.querry}
          onChange={(e) => props.setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
