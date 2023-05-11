import React from "react";
import style from "./Workspace.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Workspace = (props) => {
  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        {props.edit ? (
          <textarea
            autoFocus
            className={style.textarea}
            value={props.input}
            onChange={(e) => {
              props.handleInput(e.target.value)
            }}
            onBlur={props.handleEdit}
          />
        ) : (
          <ReactMarkdown children={props.input} className={style.markdown} />
        )}
      </div>
    </div>
  );
};

export default Workspace;
