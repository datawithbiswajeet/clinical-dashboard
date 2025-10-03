import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ExecutiveSummary from './pages/ExecutiveSummary';
import SiteAnalysisPage from './pages/SiteAnalysisPage';
import PatientAdherence from './pages/PatientAdherence';
import TrialJourney from './pages/trialjourney';
import OperationalMetrics from './pages/operationalmetrics';
import DownloadProjectPage from './pages/DownloadProjectPage'; // ✅ Add this import

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<ExecutiveSummary />} />
            <Route path="/site-analysis" element={<SiteAnalysisPage />} />
            <Route path="/patient-adherence" element={<PatientAdherence />} />
            <Route path="/trial-journey" element={<TrialJourney />} />
            <Route path="/operational-metrics" element={<OperationalMetrics />} />
            <Route path="/download-report" element={<DownloadProjectPage />} /> {/* ✅ Add this route */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;