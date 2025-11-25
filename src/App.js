import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Catalog from './components/Catalog';
import MyReservations from './components/MyReservations';
import './App.css';


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="button-container">
        <button className="action-button" onClick={() => navigate('/catalog')}>
          View Catalog
        </button>
        <button className="action-button" onClick={() => navigate('/reservations')}>
          View Reservations
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/reservations" element={<MyReservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

