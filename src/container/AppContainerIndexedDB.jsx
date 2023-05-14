import React, { useEffect, useState } from "react";
import { createCollectionsInIndexedDB, idb } from "../db/indexedDB.js";
import App from "../App.jsx";
import { AppContext } from "../context.js";

const AppContainerIndexedDB = () => {
  const [input, setInput] = useState(``);
  const [edit, setEdit] = useState(false);
  const [allNotesData, setAllNotesData] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [toggleModal, setToggleModal] = useState(false);
  const [query, setQuery] = useState("");

  let title = input.split("\n")[0];
  let innerText = input.split("\n")[1];

  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSetID = (id) => {
    let res = allNotesData.filter((note) => note.id === id);
    setSelectedNote(res[0]);
    setInput(res[0].input);
  };

  const handleInput = (text) => {
    setInput(text);
  };

  const confirmDeleting = () => {
    if (Object.keys(selectedNote).length === 0) {
      alert("Please, choose a note, wich you want to delete");
      return;
    }
    setToggleModal(true);
  };

  const handlToggl = () => {
    setToggleModal(false);
  };

  useEffect(() => {
    createCollectionsInIndexedDB();
    getAllData();
  }, []);

  const getAllData = () => {
    const dbPromise = idb.open("notes-db", 2);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("noteData", "readonly");

      const noteData = tx.objectStore("noteData");

      const notes = noteData.getAll();

      notes.onsuccess = (query) => {
        setAllNotesData(query.srcElement.result);
      };

      notes.onerror = () => {
        console.log("Error occured while loading initial data.");
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  const handleAdd = () => {
    const dbPromise = idb.open("notes-db", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("noteData", "readwrite");

      const noteData = tx.objectStore("noteData");

      const notes = noteData.put({
        id: allNotesData.length + 1,
        title: "",
        time,
        innerText: "",
        input: "",
      });

      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        getAllData();
        console.log("Note added");
      };

      notes.onerror = (event) => {
        console.log(event);
        console.log("Error occured");
      };
    };
  };

  const handleEdit = () => {
    if (Object.keys(selectedNote).length === 0) {
      alert("Please, choose a note, wich you want to edit");
      return;
    }
    setEdit(!edit);
    const dbPromise = idb.open("notes-db", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("noteData", "readwrite");

      const noteData = tx.objectStore("noteData");

      const notes = noteData.put({
        id: selectedNote.id,
        title,
        time,
        innerText,
        input,
      });

      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        getAllData();
        console.log("Note edited");
      };

      notes.onerror = (event) => {
        console.log(event);
        console.log("Error occured");
      };
    };
  };

  const handleDelete = () => {
    const dbPromise = idb.open("notes-db", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("noteData", "readwrite");

      const noteData = tx.objectStore("noteData");

      const deletedNote = noteData.delete(selectedNote.id);

      deletedNote.onsuccess = () => {
        console.log("Note deleted");
        getAllData();
        setToggleModal(false);
        setInput(``);
      };

      deletedNote.onerror = () => {
        console.log("Error occured while loading initial data.");
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  const value = {
    input,
    edit,
    allNotesData,
    selectedNote,
    query,
    toggleModal,
    handleAdd,
    handleEdit,
    confirmDeleting,
    handleSetID,
    handleInput,
    setQuery,
    handleDelete,
    handlToggl,
  };

  return (
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
  );
};

export default AppContainerIndexedDB;
