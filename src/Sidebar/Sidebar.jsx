import React from "react";
import style from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        {props.allNotesData.map((e) => {
          return (
            <div
              onClick={() => {
                props.handleSetID(e.id);
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
