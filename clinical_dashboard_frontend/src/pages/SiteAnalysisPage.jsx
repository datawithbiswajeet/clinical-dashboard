import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SiteKPICards from '../components/siteanalysis/SiteKPICards';
import SitePatientsBarChart from '../components/siteanalysis/SitePatientsBarChart';
import SiteMissedVisitsChart from '../components/siteanalysis/SiteMissedVisitsChart';
import SiteRescheduledChart from '../components/siteanalysis/SiteRescheduledChart';
import SiteGenderStackedBar from '../components/siteanalysis/SiteGenderStackedBar';
import SiteAgeDistributionChart from '../components/siteanalysis/SiteAgeDistributionChart';

const SiteAnalysisPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Enhanced Header with Green Theme */}
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
          {['🏥', '📊', '⭐', '⚠️', '👥', '📈', '🔍'].map((icon, index) => (
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
          {['#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#10b981', '#84cc16'].map((color, index) => (
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
            Clinical Trial Site Performance System
          </Typography>

          {/* Site Analysis Subtitle */}
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)',
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
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                🏥
              </span>
              Site Performance Analysis
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
            📊
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
            📈
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
            🔍
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

      {/* KPI Cards */}
      <SiteKPICards />

      {/* First Row: Main Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
            p: 3,
            height: '100%'
          }}>
            <SitePatientsBarChart title="Patients per Site" />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
            p: 3,
            height: '100%'
          }}>
            <SiteMissedVisitsChart title="Missed Visits by Site" />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
            p: 3,
            height: '100%'
          }}>
            <SiteRescheduledChart title="Rescheduled Visits by Site" />
          </Box>
        </Grid>
      </Grid>

      {/* Second Row: Detailed Analysis Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
            p: 3,
            height: '100%'
          }}>
            <SiteGenderStackedBar title="Gender Distribution by Site" />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
            p: 3,
            height: '100%'
          }}>
            <SiteAgeDistributionChart title="Age Distribution" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SiteAnalysisPage;