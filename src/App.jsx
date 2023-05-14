import React, { useContext } from "react";
import ListItem from "./ListItem/ListItem.jsx";
import SearchBox from "./SearchBox/SearchBox.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Workspace from "./Workspace/Workspace.jsx";
import ModalDelete from "./ModalDelete.jsx/ModalDelete.jsx";
import { AppContext } from "./context.js";

const App = () => {
  const { toggleModal } = useContext(AppContext);

  if (toggleModal) {
    return <ModalDelete />;
  }

  return (
    <div>
      <header>
        <ListItem />
        <SearchBox />
      </header>
      <main>
        <Sidebar />
        <Workspace />
      </main>
    </div>
  );
};

export default App;
