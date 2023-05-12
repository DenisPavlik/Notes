import React from "react";
import style from "./ModalDalete.module.css";

const ModalDelete = (props) => {
  return (
    <div className={style.body}>
      <h1>Are you sure you want to delete the note permanently?</h1>
      <p>You cannot undo this action.</p>
      <div className={style.buttons}>
        <button onClick={props.handlToggl}>Close</button>
        <button onClick={props.handleDelete}>Confirm</button>
      </div>
    </div>
  );
};

export default ModalDelete;
