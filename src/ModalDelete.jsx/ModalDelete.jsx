import React, { useContext } from "react";
import style from "./ModalDalete.module.css";
import { AppContext } from "../App";

const ModalDelete = () => {
  const {handlToggl, handleDelete} = useContext(AppContext);
  return (
    <div className={style.body}>
      <h1>Are you sure you want to delete the note permanently?</h1>
      <p>You cannot undo this action.</p>
      <div className={style.buttons}>
        <button onClick={handlToggl}>Close</button>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  );
};

export default ModalDelete;
