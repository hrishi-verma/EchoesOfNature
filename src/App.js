import logo from './logo.svg';
import './App.css';
import ExtinctSpeciesMap from './ExtinctSpeciesMap';
import Navbar from './Navbar';
import Pricing from './pages/pricing.js'
import Home from './pages/home.js'
import About from './pages/about.js'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// basename="/group-project-extinct-animal-tracker"