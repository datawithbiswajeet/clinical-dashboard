import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import AdherenceKPICards from '../components/adherence/AdherenceKPICards';
import AdherenceChartsSection from '../components/adherence/AdherenceChartsSection';
import PatientAdherenceTable from '../components/adherence/PatientAdherenceTable';
import SiteAdherenceRadialBars from '../components/adherence/SiteAdherenceRadialBars';

const PatientAdherence = () => {
  const [siteAdherenceData, setSiteAdherenceData] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false since we're using mock data
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMockData = () => {
      try {
        setError(null);

        console.log('🚀 Loading mock adherence data...');
        
        // Mock data for site adherence
        const mockAdherenceData = [
          { site: 'Site A', adherence: 85, patients: 120, completed: 102, pending: 18 },
          { site: 'Site B', adherence: 92, patients: 95, completed: 87, pending: 8 },
          { site: 'Site C', adherence: 78, patients: 110, completed: 86, pending: 24 },
          { site: 'Site D', adherence: 88, patients: 80, completed: 70, pending: 10 },
          { site: 'Site E', adherence: 95, patients: 105, completed: 100, pending: 5 },
          { site: 'Site F', adherence: 82, patients: 90, completed: 74, pending: 16 },
          { site: 'Site G', adherence: 91, patients: 75, completed: 68, pending: 7 },
          { site: 'Site H', adherence: 76, patients: 120, completed: 91, pending: 29 }
        ];

        console.log('✅ Mock Data Loaded:', {
          mockAdherenceData,
          dataLength: mockAdherenceData.length
        });

        setSiteAdherenceData(mockAdherenceData);

      } catch (err) {
        console.error('❌ Error loading mock data:', err);
        setError('Failed to load chart data: ' + err.message);
      }
    };

    loadMockData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#065f46', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading Patient Adherence Data...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Particles */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}>
          {/* Medical Icons */}
          {['👥', '✅', '📊', '🎯', '📉', '⚠️', '⏳'].map((icon, index) => (
            <Box key={index} sx={{
              position: 'absolute',
              fontSize: '24px',
              top: `${10 + index * 10}%`,
              left: `${5 + index * 12}%`,
              animation: 'float 8s ease-in-out infinite',
              animationDelay: `${index * 0.7}s`,
              opacity: 0.7
            }}>
              {icon}
            </Box>
          ))}
          
          {/* Floating Circles */}
          {['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#10b981', '#f59e0b'].map((color, index) => (
            <Box key={index} sx={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: color,
              borderRadius: '50%',
              top: `${20 + index * 8}%`,
              right: `${5 + index * 10}%`,
              animation: 'float 6s ease-in-out infinite',
              animationDelay: `${index * 0.5}s`,
              filter: 'blur(1px)',
              opacity: 0.4
            }} />
          ))}
        </Box>

        {/* Main Header Content */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1,
          textAlign: 'center'
        }}>
          {/* Main Title */}
          <Typography variant="h2" component="h1" gutterBottom sx={{
            fontWeight: 'bold',
            color: '#1e3a2f',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            mb: 1,
            fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
            background: 'linear-gradient(135deg, #1e3a2f 0%, #2d5a4b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Clinical Trial Patient Adherence Monitoring System
          </Typography>

          {/* Patient Adherence Subtitle */}
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
            mt: 2
          }}>
            <Typography variant="h4" sx={{ 
              color: '#1e3a2f',
              fontWeight: '600',
              fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.8rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
              }}>
                👥
              </span>
              Patient Adherence
            </Typography>
          </Box>
        </Box>

        {/* Additional Floating Elements */}
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          zIndex: 0,
          animation: 'float 10s ease-in-out infinite'
        }}>
          <Typography variant="h4" sx={{ opacity: 0.3 }}>
            📈
          </Typography>
        </Box>

        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          right: '5%',
          zIndex: 0,
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '2s'
        }}>
          <Typography variant="h4" sx={{ opacity: 0.3 }}>
            🎯
          </Typography>
        </Box>

        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          zIndex: 0,
          animation: 'float 9s ease-in-out infinite',
          animationDelay: '4s'
        }}>
          <Typography variant="h4" sx={{ opacity: 0.3 }}>
            ✅
          </Typography>
        </Box>
      </Box>

      {/* Show error alert if any */}
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Adherence KPI Cards */}
      <AdherenceKPICards />

      {/* Adherence Charts Section */}
      <AdherenceChartsSection 
        siteAdherenceData={siteAdherenceData}
      />

      {/* Site Adherence Radial Bars Chart */}
      <Box sx={{ mb: 4 }}>
        <SiteAdherenceRadialBars 
          data={siteAdherenceData}
          title="Site-wise Adherence Distribution (Radial View)"
        />
      </Box>

      {/* Patient Details Table */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 'bold', 
          color: '#1e3a2f',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          📋 Patient Adherence Details
        </Typography>
        <PatientAdherenceTable />
      </Box>

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
        `}
      </style>
    </Container>
  );
};

export default PatientAdherence;