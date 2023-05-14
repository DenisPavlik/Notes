import React, { useContext } from "react";
import style from "./Sidebar.module.css";
import { AppContext } from "../App";

const Sidebar = (props) => {
  const {allNotesData, handleSetID, query} = useContext(AppContext);

  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        {allNotesData
          .filter((e) => {
            if (query === "") {
              return e;
            } else if (
              e.title.toLowerCase().includes(query.toLowerCase())
            ) {
              return e;
            } else {
              return "";
            }
          })
          .map((e) => {
            return (
              <div
                onClick={() => {
                  handleSetID(e.id);
                }}
                className={style.note}
                key={e.id}
              >
                <b className={style.title}>{e.title}</b>
                <div className={style.info}>
                  <p className={style.date}>{e.time}</p>
                  <p className={style.text}>{e.innerText}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
