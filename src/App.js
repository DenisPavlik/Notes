import { useEffect, useState } from "react";
import ListItem from "./ListItem/ListItem.jsx";
import SearchBox from "./SearchBox/SearchBox.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Workspace from "./Workspace/Workspace.jsx";
import { createCollectionsInIndexedDB, idb } from "./indexedDB.js";

const App = () => {
  const [input, setInput] = useState(``);
  const [edit, setEdit] = useState(false);
  const [allNotesData, setAllNotesData] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});


  let title = input.split("\n")[0];
  let innerText = input.split("\n")[1];

  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

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

  const handleSetID = (id) => {
    let res = allNotesData.filter((note) => note.id === id);
    setSelectedNote(res[0]);
    setInput(res[0].input)
  };

  const handleInput = (text) => {
    setInput(text);
  };

  const handleAdd = () => {
    const dbPromise = idb.open("notes-db", 2);
    dbPromise.onsuccess = () => {
      
      const db = dbPromise.result;

      const tx = db.transaction("noteData", "readwrite");

      const noteData = tx.objectStore("noteData");

      const notes = noteData.put({
        id: allNotesData.length + 1,
        title: '',
        time,
        innerText: '',
        input: '',
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
        console.log("Note added");
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
        console.log('Note deleted');
        getAllData();
      };

      deletedNote.onerror = () => {
        console.log("Error occured while loading initial data.");
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  return (
    <div>
      <header>
        <ListItem handleEdit={handleEdit} handleAdd={handleAdd} handleDelete={handleDelete} />
        <SearchBox />
      </header>
      <main>
        <Sidebar allNotesData={allNotesData} handleSetID={handleSetID} />
        <Workspace
          input={input}
          handleInput={handleInput}
          edit={edit}
          handleEdit={handleEdit}
          selectedNote={selectedNote}
        />
      </main>
    </div>
  );
};

export default App;
