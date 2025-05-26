import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagInputPage from './pages/TagInputPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/tag-input" element={<TagInputPage />} />
      </Routes>
    </Router>
  );
}

export default App;