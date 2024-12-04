import logo from './logo.svg';
import './App.css';
import ExtinctSpeciesMap from './ExtinctSpeciesMap';
import Navbar from './Navbar';
import Pricing from './pages/pricing.js'
import Home from './pages/home.js'
import About from './pages/about.js'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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
    <Router >
      <><Navbar />
        <div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
// basename="/group-project-extinct-animal-tracker"