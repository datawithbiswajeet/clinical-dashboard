import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import KPICards from '../components/KPICards';
import ChartsSection from '../components/ChartsSection';

const ExecutiveSummary = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Enhanced Header with Green Theme */}
      <Box sx={{ 
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Particles - ENHANCED */}
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
          {['⚕️', '💊', '🩺', '🏥', '🌡️', '❤️', '🩹'].map((icon, index) => (
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
          {/* Main Title - Updated with new text and smaller font size */}
          <Typography variant="h2" component="h1" gutterBottom sx={{
            fontWeight: 'bold',
            color: '#1e3a2f',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            mb: 1, // Reduced margin for closer spacing
            fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' }, // Reduced font size
            background: 'linear-gradient(135deg, #1e3a2f 0%, #2d5a4b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Clinical Trial Executive Summary Dashboard
          </Typography>

          {/* Executive Summary Subtitle */}
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
            mt: 2 // Added margin top for gap
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
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                📊
              </span>
              Executive Summary
            </Typography>
          </Box>
        </Box>

        {/* Additional Floating Medical Elements */}
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          zIndex: 0,
          animation: 'float 10s ease-in-out infinite'
        }}>
          <Typography variant="h4" sx={{ opacity: 0.3 }}>
            🧪
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
            🔬
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts Section */}
      <ChartsSection />
    </Container>
  );
};

export default ExecutiveSummary;