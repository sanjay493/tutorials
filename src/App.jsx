import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import TutorialRegistry from './tutorials';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          {/* Dynamic Tutorial Routes */}
          {TutorialRegistry.map((tutorial) => (
            <Route
              key={tutorial.id}
              path={`/tutorials/${tutorial.path}/*`}
              element={<tutorial.component />}
            />
          ))}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
