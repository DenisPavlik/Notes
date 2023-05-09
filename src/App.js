import './App.css';
import ListItem from './ListItem/ListItem.jsx';
import SearchBox from './SearchBox/SearchBox.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Workspace from './Workspace/Workspace.jsx';

const App = () => {
  return (
    <div className="App">
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
}

export default App;
