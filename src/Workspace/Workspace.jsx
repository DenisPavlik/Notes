import React, { useState } from "react";
import style from "./Workspace.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Workspace = () => {
  const [input, setInput] = useState(``);
  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        <textarea
          className={style.textarea}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {/* <ReactMarkdown children={input} className={style.markdown} /> */}
      </div>
    </div>
  );
};

export default Workspace;
