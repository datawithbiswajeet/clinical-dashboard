import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import OperationalKPICards from '../components/operationalmetrics/omkpi';
import QueryCompletenessChart from '../components/operationalmetrics/QueryCompletenessChart';
import MedicationTakePercentChart from '../components/operationalmetrics/MedicationTakePercentChart';
import TimelinessChart from '../components/operationalmetrics/TimelinessChart';
import SiteRandomizedGroupedBar from '../components/operationalmetrics/randomizedgroupbar';
import OperationalTable from '../components/operationalmetrics/OperationalTable';

const OperationalMetrics = () => {
  const ChartContainer = ({ children }) => (
    <Box sx={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
      p: 3,
      height: '100%'
    }}>
      {children}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Enhanced Header with Blue Theme */}
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
          {/* Operational Icons */}
          {['📊', '⚡', '✅', '⏱️', '📈', '🔍', '📋'].map((icon, index) => (
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
          {['#3b82f6', '#60a5fa', '#1d4ed8', '#10b981', '#f59e0b', '#8b5cf6'].map((color, index) => (
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
            color: '#1e3a8a',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            mb: 1,
            fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Clinical Trial Operational Excellence Dashboard
          </Typography>

          {/* Operational Metrics Subtitle */}
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
            mt: 2
          }}>
            <Typography variant="h4" sx={{ 
              color: '#1e3a8a',
              fontWeight: '600',
              fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.8rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                📊
              </span>
              Operational Metrics
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
            ⚡
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
            ✅
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
            ⏱️
          </Typography>
        </Box>

        {/* Global Styles for Animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
            }
          `}
        </style>
      </Box>

      {/* First Row: KPI Cards */}
      <OperationalKPICards />

      {/* Second Row: Three Bar Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <ChartContainer>
            <QueryCompletenessChart />
          </ChartContainer>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ChartContainer>
            <MedicationTakePercentChart />
          </ChartContainer>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ChartContainer>
            <TimelinessChart />
          </ChartContainer>
        </Grid>
      </Grid>

      {/* Third Row: Randomized Stats - Full Width */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
            p: 0,
            height: '100%',
            width: '100%',
            overflow: 'hidden'
          }}>
            <SiteRandomizedGroupedBar />
          </Box>
        </Grid>
      </Grid>

      {/* Fourth Row: Comprehensive Table - Full Width */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartContainer>
            <OperationalTable />
          </ChartContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OperationalMetrics;