import React from 'react';
import Chart from 'react-apexcharts';
import { Box, Typography, useTheme } from '@mui/material';

const TrialJourneyEdiaryBar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const siteData = [
    { name: "AIIMS Bangalore", submitted: 812, notSubmitted: 475 },
    { name: "AIIMS Delhi", submitted: 1452, notSubmitted: 259 },
    { name: "AIIMS Jodhpur", submitted: 299, notSubmitted: 451 },
    { name: "AIIMS Patna", submitted: 768, notSubmitted: 484 }
  ];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true,
      toolbar: { show: false },
      animations: { enabled: true }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '60%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, { seriesIndex, dataPointIndex }) {
        if (seriesIndex === 0) {
          const total = siteData[dataPointIndex].submitted + siteData[dataPointIndex].notSubmitted;
          
          return `${val}`;
        }
        return '';
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#080000ff']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 6,
        borderRadius: 8,
        borderWidth: 0,
        opacity: 0.8,
        dropShadow: { enabled: false }
      },
      offsetX: 0,
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: siteData.map(site => site.name),
      labels: {
        style: {
          colors: isDark ? '#e5e7eb' : '#374151',
          fontSize: '14px',
          fontWeight: 600,
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#e5e7eb' : '#374151',
          fontSize: '14px',
          fontWeight: 600,
        }
      }
    },
    grid: {
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      strokeDashArray: 4,
    },
    // Professional color scheme
    colors: [
      // Submitted - Professional green
      isDark ? '#70e000' : '#9ef01a',
      // Not Submitted - Professional red
      isDark ? '#ef233c' : '#d80032'
    ],
    fill: {
      type: 'solid',
      opacity: 0.9
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 600,
      labels: {
        colors: isDark ? '#e5e7eb' : '#374151',
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function(val, { seriesIndex }) {
          const label = seriesIndex === 0 ? 'Submitted' : 'Not Submitted';
          return `${label}: ${val} patients`;
        }
      }
    },
  };

  const chartSeries = [
    {
      name: 'Submitted',
      data: siteData.map(site => site.submitted)
    },
    {
      name: 'Not Submitted',
      data: siteData.map(site => site.notSubmitted)
    }
  ];

  return (
    <Box sx={{
      background: isDark 
        ? 'linear-gradient(135deg, rgba(16, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 100%)',
      backdropFilter: 'blur(10px)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      p: 3,
      width: '100%',
    }}>
      
      {/* Header - Centered */}
      <Box sx={{ 
        mb: 3, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold',
          color: isDark ? '#ffffff' : '#1f2937',
          mb: 2
        }}>
          eDiary Submission Stats
        </Typography>
        
        {/* Stats - Centered */}
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontWeight: 600 }}>
              Total Patients
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 'bold' }}>
              {siteData.reduce((sum, site) => sum + site.submitted + site.notSubmitted, 0).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontWeight: 600 }}>
              Submission Rate
            </Typography>
            <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 'bold' }}>
              {((siteData.reduce((sum, site) => sum + site.submitted, 0) / 
                siteData.reduce((sum, site) => sum + site.submitted + site.notSubmitted, 0)) * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ 
        width: '100%', 
        height: 350,
        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
        borderRadius: '12px',
        p: 2,
        border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
      }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="100%"
          width="100%"
        />
      </Box>

      {/* Summary Cards - Centered */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2, 
        mt: 3 
      }}>
        {siteData.map((site, index) => {
          const total = site.submitted + site.notSubmitted;
          const rate = ((site.submitted / total) * 100).toFixed(1);
          
          return (
            <Box 
              key={site.name}
              sx={{
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                p: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 'bold', 
                color: isDark ? '#e5e7eb' : '#374151',
                mb: 1
              }}>
                {site.name}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: rate >= 70 ? '#10b981' : rate >= 50 ? '#f7b801' : '#ef4444', 
                fontWeight: 'bold',
                mb: 0.5
              }}>
                {rate}%
              </Typography>
              <Typography variant="caption" sx={{ 
                color: isDark ? '#9ca3af' : '#6b7280'
              }}>
                {site.submitted}/{total} patients
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrialJourneyEdiaryBar;