import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchVisitStatus } from '../API';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const VisitStatusDonut = () => {
  const theme = useTheme();
  const [visitData, setVisitData] = useState({ completed: 0, missed: 0, rescheduled: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitStatus()
      .then(response => {
        setVisitData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching visit status:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        p: 3,
        height: '450px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress 
          size={50} 
          sx={{ 
            color: '#065f46',
            filter: 'drop-shadow(0 4px 12px rgba(6, 95, 70, 0.3))'
          }} 
        />
      </Box>
    );
  }

  const options = {
    chart: { 
      type: 'donut', 
      height: 280 
    },
    labels: ['Completed', 'Missed', 'Rescheduled'],
    colors: ['#065f46', '#ff6b6b', '#ffd93d'],
    legend: { 
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 600,
      labels: {
        colors: '#1e3a2f'
      }
    },
    dataLabels: { 
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#ffffff']
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.5
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Visits',
              color: '#1e3a2f',
              fontSize: '16px',
              fontWeight: 'bold'
            },
            value: {
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1e3a2f'
            }
          }
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return val + " visits";
        }
      }
    }
  };

  const series = [visitData.completed, visitData.missed, visitData.rescheduled];
  const totalVisits = visitData.completed + visitData.missed + visitData.rescheduled;

  return (
    <Box sx={{ 
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      p: 3,
      height: '450px',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 12px 48px rgba(6, 95, 70, 0.2)',
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease'
      },
      transition: 'all 0.3s ease'
    }}>
      
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(6,95,70,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,107,107,0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255,217,61,0.03) 0%, transparent 50%)
        `,
        animation: 'pulse 4s ease-in-out infinite alternate',
        zIndex: 0
      }} />

      {/* Main Content */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        
        {/* Donut Chart */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Chart options={options} series={series} type="donut" height={280} />
        </Box>

        {/* Stats Box */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          p: 2,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#065f46">
              {visitData.completed}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Completed
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#ff6b6b">
              {visitData.missed}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Missed
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#ffd93d">
              {visitData.rescheduled}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Rescheduled
            </Typography>
          </Box>
        </Box>

        {/* Total Visits */}
        <Box sx={{ 
          mt: 1, 
          p: 1.5,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="body2" fontWeight="bold" sx={{ 
            color: '#065f46',
            fontSize: '14px'
          }}>
            Total Visits: {totalVisits}
          </Typography>
        </Box>
      </Box>

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default VisitStatusDonut;