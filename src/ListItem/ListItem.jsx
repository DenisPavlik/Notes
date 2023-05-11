import React from "react";
import addIcon from '../img/add.png'
import deleteIcon from '../img/delete.png'
import editIcon from '../img/edit.png'
import style from './ListItem.module.css'

const ListItem = (props) => {
  return (
    <div className={style.body}>
      <div className={style.body_inner}>
        <button onClick={props.handleAdd}><img src={addIcon} alt="add" /></button>
        <button onClick={props.handleDelete}><img src={deleteIcon} alt="delete" /></button>
        <button onClick={props.handleEdit}><img src={editIcon} alt="edit" /></button>
      </div>
    </div>
  )
}

export default ListItem;