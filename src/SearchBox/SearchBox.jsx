import React, { useContext } from "react";
import style from "./SearchBox.module.css";
import searchIcon from "../img/search.png";
import { AppContext } from "../App";

const SearchBox = () => {
  const { querry, setQuery } = useContext(AppContext);

  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Serach"
          value={querry}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
