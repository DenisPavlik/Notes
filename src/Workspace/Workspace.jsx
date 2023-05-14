import React, { useContext } from "react";
import style from "./Workspace.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { AppContext } from "../App";

const Workspace = () => {
  const {input, handleInput, edit, handleEdit} = useContext(AppContext);

  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        {edit ? (
          <textarea
            autoFocus
            className={style.textarea}
            value={input}
            onChange={(e) => {
              handleInput(e.target.value)
            }}
            onBlur={handleEdit}
          />
        ) : (
          <ReactMarkdown children={input} className={style.markdown} />
        )}
      </div>
    </div>
  );
};

export default Workspace;
