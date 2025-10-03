import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchEnrollmentTrend } from '../API';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const EnrollmentTrend = () => {
  const theme = useTheme();
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollmentTrend()
      .then(response => {
        setTrendData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching trend data:", error);
        setLoading(false);
      });
  }, []);

  // Enhanced chart options with your requirements
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 280,
      toolbar: { show: false },
      animations: { 
        enabled: true, 
        easing: 'easeinout', 
        speed: 1000 
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 15, // Rounded top edges
        borderRadiusApplication: 'end',
        columnWidth: '95%', // Spacing between bars
        barHeight: '85%',
        distributed: false,
        dataLabels: { 
          position: 'top' 
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) { return val; },
      offsetY: -20,
      style: { 
        fontSize: '12px', 
        fontWeight: 'bold', 
        colors: ['#1e3a2f'] // Dark green text color
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 8,
        borderWidth: 0,
        opacity: 0.8,
        dropShadow: {
          enabled: false
        }
      }
    },
    xaxis: {
      categories: trendData.map(item => item.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { 
        style: { 
          fontSize: '12px', 
          fontWeight: 600,
          colors: '#1e3a2f' // Dark green text color
        }
      },
      tooltip: { enabled: false }
    },
    yaxis: {
      show: false, // Hides the 0-400 markings on left side
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false }, // Completely remove the markings
      tooltip: { enabled: false }
    },
    grid: {
      show: false, // Remove grid lines
      padding: {
        left: 0,
        right: 0
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.4,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.7,
        stops: [0, 50, 100],
        colorStops: [
          {
            offset: 0,
            color: '#065f46', // Dark green
            opacity: 1
          },
          {
            offset: 50,
            color: '#059669', // Medium green
            opacity: 0.9
          },
          {
            offset: 100,
            color: '#10b981', // Light green
            opacity: 0.8
          }
        ]
      }
    },
    stroke: {
      show: true,
      width: 0, // No border
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return val + " enrollments";
        }
      }
    },
    markers: {
      size: 0
    }
  };

  const chartSeries = [{
    name: 'Monthly Enrollment',
    data: trendData.map(item => item.enrollment)
  }];

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
            color: '#10b981',
            filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))'
          }} 
        />
      </Box>
    );
  }

  const totalEnrollment = trendData.reduce((sum, item) => sum + item.enrollment, 0);
  const averageEnrollment = totalEnrollment / (trendData.length || 1);
  const peakEnrollment = Math.max(...trendData.map(item => item.enrollment));

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
        boxShadow: '0 12px 48px rgba(16, 185, 129, 0.2)',
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
          radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%)
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
        flexDirection: 'column'
      }}>
        
        {/* Main Chart */}
        <Box sx={{ position: 'relative', zIndex: 1, flex: 1 }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={280}
          />
        </Box>

        {/* Stats Footer */}
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          height: '80px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#065f46' }}>
              {totalEnrollment}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#059669' }}>
              {Math.round(averageEnrollment)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Average
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#10b981' }}>
              {peakEnrollment}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Peak
            </Typography>
          </Box>
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

export default EnrollmentTrend;