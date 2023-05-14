import React, { useContext } from "react";
import addIcon from "../img/add.png";
import deleteIcon from "../img/delete.png";
import editIcon from "../img/edit.png";
import style from "./ListItem.module.css";
import { AppContext } from "../context";

const ListItem = () => {
  const {allNotesData, handleEdit, handleAdd, confirmDeleting} = useContext(AppContext);

  return (
    <div className={style.body}>
      {allNotesData.length > 0 ? (
          <div className={style.body_inner}>
            <button onClick={handleAdd}>
              <img src={addIcon} alt="add" />
            </button>
            <button onClick={confirmDeleting}>
              <img src={deleteIcon} alt="delete" />
            </button>
            <button onClick={handleEdit}>
              <img src={editIcon} alt="edit" />
            </button>
        </div>
      ) : (
        <div className={style.body_inner}>
            <button onClick={handleAdd}>
              <img src={addIcon} alt="add" />
            </button>
            <button disabled onClick={confirmDeleting}>
              <img src={deleteIcon} alt="delete" />
            </button>
            <button disabled onClick={handleEdit}>
              <img src={editIcon} alt="edit" />
            </button>
        </div>
      )}
    </div>
  );
};

export default ListItem;
