import React, { useState } from 'react';
import './App.css';
import ExtinctSpeciesMap from './ExtinctSpeciesMap';
import Navbar from './Navbar';
import Pricing from './pages/pricing.js'
import Home from './pages/home.js'
import About from './pages/about.js'
import Footer from './Footer.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [pieChartVisible, setPieChartVisible] = useState(false); // Track if pie chart is visible

  const handleMapClick = () => {
    // Trigger pie chart visibility (you can update this logic based on your map's interaction)
    setPieChartVisible(true);
  };

  let Component;
  switch (window.location.pathname) {
    case '/Home':
      Component = <Home />;
      break;
    case "/Pricing":
      Component = <Pricing />;
      break;
    case "/About":
      Component = <About />;
      break;
  }

  return (
    <Router>
      <Navbar />
      <div 
        style={{
          minHeight: pieChartVisible ? 'calc(100vh - 200px)' : '100vh', // Adjust content area height when pie chart is visible
          overflowY: 'hidden', // Ensure scrollable content area
          paddingBottom: '100px', // Ensure space for footer
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* Make sure the pie chart renders here */}
      </div>
      <Footer />
    </Router>
  );
}

export default App;
