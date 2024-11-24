import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilterPage from './components/FilterPage';
import ChartsPage from './components/ChartsPage';
import MapPage from './components/MapPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes> {}
        <Route path="/" element={<FilterPage />} /> {}
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
