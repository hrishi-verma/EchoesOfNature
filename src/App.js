import logo from './logo.svg';
import './App.css';
import ExtinctSpeciesMap from './ExtinctSpeciesMap';
import Navbar from './Navbar';

function App() {
  return (
    <>
    

    <div>
        return <Navbar />
    </div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <ExtinctSpeciesMap />
        </div>
      </header>
    </div>
    </>
  );
}

export default App;
