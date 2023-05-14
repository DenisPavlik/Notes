import React, { useEffect, useState } from "react";
import App from "../App.jsx";
import { AppContext } from "../context.js";
import {
  addNote,
  deleteNote,
  getAllDataDB,
  updateNote,
} from "../db/quanitaDB.js";

const AppContainerQuintaDB = () => {
  const [input, setInput] = useState(``);
  const [edit, setEdit] = useState(false);
  const [allNotesData, setAllNotesData] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [toggleModal, setToggleModal] = useState(false);
  const [query, setQuery] = useState("");
  const [globalID, setGlobalID] = useState("");
  const [globalData, setGlobalData] = useState([]);

  let title = input.split("\n")[0];
  let innerText = input.split("\n")[1];

  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSetID = (id) => {
    let res = allNotesData.filter((note) => note.id === id);
    let resGlobal = globalData.filter(
      (data) => data.values.bmfmoZWR5dIPxcGSonBmkJ === id
    );
    setSelectedNote(res[0]);
    setInput(res[0].input || "");
    setGlobalID(resGlobal[0].id);
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
    getAllDataDB()
      .then((res) => {
        setGlobalData([...res]);
        let result = res.map((e) => {
          return {
            id: e.values.bmfmoZWR5dIPxcGSonBmkJ,
            title: e.values.ddTqFdK8jaWOhdUmkjdSo9,
            time: e.values.bIWRdcQ8nktB5LA8kKuSky,
            innerText: e.values.dcOvC9hXDgpyowWPtcI3fm,
            input: e.values.cYoSk0WQvjzkFdSWK_CCow,
          };
        });
        setAllNotesData(result);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(
            `Something wrong in response: ${error.response.data.message}`
          );
        } else if (error.request) {
          console.log(`Something wrong in request: ${error.request}`);
        } else {
          console.log(`Error ${error.message}`);
        }
      });
  }, []);

  const handleAdd = () => {
    const note = {
      id: allNotesData.length + 1,
      title: "",
      time,
      innerText: "",
      input: "",
    };
    addNote(note)
      .then(
        getAllDataDB()
          .then((res) => {
            setGlobalData([...res]);
            let result = res.map((e) => {
              return {
                id: e.values.bmfmoZWR5dIPxcGSonBmkJ,
                title: e.values.ddTqFdK8jaWOhdUmkjdSo9,
                time: e.values.bIWRdcQ8nktB5LA8kKuSky,
                innerText: e.values.dcOvC9hXDgpyowWPtcI3fm,
                input: e.values.cYoSk0WQvjzkFdSWK_CCow,
              };
            });
            setAllNotesData(result);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(
                `Something wrong in response: ${error.response.data.message}`
              );
            } else if (error.request) {
              console.log(`Something wrong in request: ${error.request}`);
            } else {
              console.log(`Error ${error.message}`);
            }
          })
      )
      .catch(function (error) {
        if (error.response) {
          console.log(
            `Something wrong in response: ${error.response.data.message}`
          );
        } else if (error.request) {
          console.log(`Something wrong in request: ${error.request}`);
        } else {
          console.log(`Error ${error.message}`);
        }
      });
  };

  const handleEdit = () => {
    if (Object.keys(selectedNote).length === 0) {
      alert("Please, choose a note, wich you want to edit");
      return;
    }
    setEdit(!edit);

    if (edit) {
      const note = {
        id: selectedNote.id,
        title,
        time,
        innerText,
        input,
      };
      updateNote(globalID, note)
        .then(getAllDataDB())
        .catch(function (error) {
          if (error.response) {
            console.log(
              `Something wrong in response: ${error.response.data.message}`
            );
          } else if (error.request) {
            console.log(`Something wrong in request: ${error.request}`);
          } else {
            console.log(`Error ${error.message}`);
          }
        });
    }
  };

  const handleDelete = () => {
    deleteNote(globalID)
      .then(getAllDataDB())
      .catch(function (error) {
        if (error.response) {
          console.log(
            `Something wrong in response: ${error.response.data.message}`
          );
        } else if (error.request) {
          console.log(`Something wrong in request: ${error.request}`);
        } else {
          console.log(`Error ${error.message}`);
        }
      });
    setToggleModal(false);
    setInput(``);
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

export default AppContainerQuintaDB;
