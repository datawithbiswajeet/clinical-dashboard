import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Assessment as SitePerformanceIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  LocalHospital as HospitalIcon,
  Favorite as HeartIcon,
  MonitorHeart as MonitorIcon,
  Emergency as EmergencyIcon,
  Vaccines as VaccineIcon,
  Analytics as AnalyticsIcon, // New icon for Operational Metrics
  Download as DownloadIcon // New icon for Download Report
} from '@mui/icons-material';

const drawerWidth = 280;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Executive Summary', icon: <DashboardIcon />, path: '/' },
    { text: 'Site Analysis', icon: <SitePerformanceIcon />, path: '/site-analysis' },
    { text: 'Patient Adherence', icon: <PeopleIcon />, path: '/patient-adherence' },
    { text: 'Trial Journey', icon: <TrendingUpIcon />, path: '/trial-journey' },
    { text: 'Operational Metrics', icon: <AnalyticsIcon />, path: '/operational-metrics' },
    { text: 'Download Report', icon: <DownloadIcon />, path: '/download-report' }
  ];

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '3px 0 15px rgba(0, 100, 0, 0.15)',
          background: 'linear-gradient(180deg, #4caf50 0%, #065f46 60%, #059669 100%)',
          overflow: 'hidden',
          color: 'white',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {/* Enhanced Logo Section with Animation */}
      <Box sx={{ 
        p: 3, 
        background: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Animated Background Elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          animation: 'pulse 4s ease-in-out infinite alternate'
        }} />

        {/* Rotating Medical Icons Circle - Increased spacing */}
        <Box sx={{
          position: 'relative',
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Central Icon */}
          <Box sx={{
            position: 'absolute',
            background: 'white',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            zIndex: 2,
            animation: 'pulse 1s ease-in-out infinite'
          }}>
            <HospitalIcon sx={{ fontSize: 32, color: '#2e7d32' }} />
          </Box>

          {/* Rotating Icons with increased spacing */}
          {[
            { icon: <HeartIcon sx={{ fontSize: 16, color: '#ff6b6b' }} />, angle: 0 },
            { icon: <MonitorIcon sx={{ fontSize: 16, color: '#4dabf7' }} />, angle: 90 },
            { icon: <EmergencyIcon sx={{ fontSize: 16, color: '#ffa94d' }} />, angle: 180 },
            { icon: <VaccineIcon sx={{ fontSize: 16, color: '#69db7c' }} />, angle: 270 },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: 28,
                height: 28,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                transform: `rotate(${item.angle}deg) translate(40px) rotate(-${item.angle}deg)`,
                animation: 'rotate 10s linear infinite',
                animationDelay: `${index * 1.2}s`
              }}
            >
              {item.icon}
            </Box>
          ))}
        </Box>

        {/* Centered Headline with brighter glow effect */}
        <Box sx={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
          <Typography 
            variant="h6" 
            component="h1" 
            fontWeight="bold" 
            sx={{ 
              lineHeight: 1.3,
              fontSize: '1.1rem',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
              color: '#ffffff',
              fontWeight: '700',
              animation: 'textGlow 2s ease-in-out infinite alternate'
            }}
          >
            Patient Recruitment and Adherence Monitoring System
          </Typography>
        </Box>

        {/* Animated Dots */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          mt: 1
        }}>
          {[1, 2, 3].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.8)',
                animation: 'bounce 1.5s ease-in-out infinite',
                animationDelay: `${dot * 0.2}s`
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, pt: 3, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: 'white',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                },
                transition: 'all 0.2s ease',
                py: 1.2,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <ListItemIcon sx={{ 
                color: 'white', 
                minWidth: '40px' 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '0.95rem'
                  }
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* Current Date */}
      <Box sx={{ 
        p: 2, 
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {formattedDate}
        </Typography>
      </Box>

      {/* User Info at Bottom - Removed Avatar, Increased font size */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 0.5,
        background: 'rgba(255, 255, 255, 0.15)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        minHeight: 80
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
          Biswajeet Prasad
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9, fontSize: '0.9rem' }}>
          Administrator
        </Typography>
      </Box>

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes rotate {
            0% { transform: rotate(0deg) translate(50px) rotate(0deg); }
            100% { transform: rotate(360deg) translate(50px) rotate(-360deg); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; transform: scale(0.98); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          
          @keyframes gentlePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes textGlow {
            0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4); }
            100% { text-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 25px rgba(255, 255, 255, 0.8), 0 0 35px rgba(255, 255, 255, 0.6), 0 0 45px rgba(255, 255, 255, 0.4); }
          }
        `}
      </style>
    </Drawer>
  );
};

export default Sidebar;