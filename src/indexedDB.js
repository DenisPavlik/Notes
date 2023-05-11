export const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export const createCollectionsInIndexedDB = () => {
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  // console.log(idb);

  const request = idb.open("notes-db", 2);

  request.onerror = (event) => {
    console.log("Error", event);
    console.log("An error occured with IndexedDB");
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;

    if (!db.objectStoreNames.contains("noteData")) {
      db.createObjectStore("noteData", {
        keyPath: "id",
      });
    }
  };

  request.onsuccess = () => {
    console.log("Database opened successfully");
  };
};
