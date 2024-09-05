import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HackathonDashboard from './components/HackathonDashboard';
import HackathonForm from './components/HackathonForm';
import HackathonDetail from './components/HackathonDetails';
import { HackathonProvider } from './contexts/HackathonContext';

const App: React.FC = () => {
  return (
    <HackathonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HackathonDashboard />} />
          <Route path="/create" element={<HackathonForm />} />
          <Route path="/edit/:id" element={<HackathonForm />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
        </Routes>
      </Router>
    </HackathonProvider>
  );
};

export default App;
