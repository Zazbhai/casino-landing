import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accessadmin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
