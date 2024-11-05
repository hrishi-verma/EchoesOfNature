import logo from './logo.svg';
import './App.css';
import ExtinctSpeciesMap from './ExtinctSpeciesMap';
import Navbar from './Navbar';
import Pricing from './pages/pricing.js'
import Home from './pages/home.js'
import About from './pages/about.js'


function App() {

  let Component
  switch (window.location.pathname) {
    case '/Home':
      Component = <Home />
      break
    case "/Pricing":
      Component = <Pricing />
      break
    case "/About":
      Component = <About />
      break

  }
  
 
  return (
    <><Navbar />
    
    
    <div className="App">
      <header className="App-header">
        <div>
          <ExtinctSpeciesMap />
        </div>
      </header>
    </div>
    </>
  );
}

export default App;
