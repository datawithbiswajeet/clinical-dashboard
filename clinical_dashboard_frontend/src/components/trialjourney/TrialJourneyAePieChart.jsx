import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress, Typography, useTheme, Card, CardContent } from '@mui/material';

const TrialJourneyAePieChart = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [loading, setLoading] = useState(true);

  // Data with your requested colors
  const mockData = [
    { category: "Mild", count: 67, percentage: 19.6, color: '#8ac926' }, // Green
    { category: "Moderate", count: 195, percentage: 57.2, color: '#ffff11' }, // Yellow
    { category: "Severe", count: 79, percentage: 23.2, color: '#ff4d6d' }  // Red
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const chartOptions = {
    chart: {
      type: 'donut',
      height: 300,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    labels: mockData.map(item => item.category),
    colors: mockData.map(item => item.color),
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 600,
      labels: {
        colors: isDark ? '#e5e7eb' : '#374151',
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 8,
        offsetX: -5,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, { seriesIndex, w }) {
        return `${w.config.series[seriesIndex]}`;
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#110101ff']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 6,
        borderRadius: 10,
        borderWidth: 0,
        opacity: 0.8,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          color: '#000000',
          opacity: 0.3
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 'bold',
              color: isDark ? '#e5e7eb' : '#374151',
              offsetY: -8
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 'bold',
              color: isDark ? '#e5e7eb' : '#374151',
              offsetY: 8,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              label: 'Total Events',
              color: isDark ? '#e5e7eb' : '#374151',
              fontSize: '16px',
              fontWeight: 'bold',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        },
        // Remove the expand effect
        expandOnClick: false,
      }
    },
    // Disable hover effects
    states: {
      hover: {
        filter: {
          type: 'none',
        }
      },
      active: {
        filter: {
          type: 'none',
        }
      }
    },
    stroke: {
      show: false,
      width: 0
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val, { seriesIndex, w }) {
          const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
          const percentage = ((val / total) * 100).toFixed(1);
          return `
            <div style="padding: 10px; text-align: center;">
              <strong style="font-size: 16px; color: ${mockData[seriesIndex].color}">${val} events</strong><br/>
              <span style="color: #6b7280; font-size: 14px;">${percentage}% of total</span>
            </div>
          `;
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 280
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chartSeries = mockData.map(item => item.count);

  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: isDark ? '#1e1e1e' : '#f5f5f5'
      }}>
        <CircularProgress 
          size={50} 
          sx={{ color: '#007200' }} 
        />
      </Card>
    );
  }

  const totalEvents = mockData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card sx={{ 
      p: 3, 
      height: '100%',
      background: isDark ? '#2d2d2d' : '#ffffff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      borderRadius: '12px'
    }}>
      <CardContent>
        {/* Header */}
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          mb: 3,
          color: isDark ? '#ffffff' : '#333333'
        }}>
          Adverse Events Overview
        </Typography>

        {/* Chart Container */}
        <Box sx={{ height: '300px' }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height="100%"
            width="100%"
          />
        </Box>

        {/* Summary Stats */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 2, 
          mt: 3,
          p: 2,
          background: isDark ? '#3d3d3d' : '#f9f9f9',
          borderRadius: '8px'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: isDark ? '#cccccc' : '#666666' }}>
              Total Events
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
              {totalEvents}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: isDark ? '#cccccc' : '#666666' }}>
              Categories
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
              {mockData.length}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: isDark ? '#cccccc' : '#666666' }}>
              Highest
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
              {Math.max(...mockData.map(item => item.count))}
            </Typography>
          </Box>
        </Box>

        {/* Percentage Breakdown */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 1, 
          mt: 2 
        }}>
          {mockData.map((item, index) => (
            <Box key={item.category} sx={{ textAlign: 'center', p: 1 }}>
              <Typography variant="body2" sx={{ 
                fontWeight: 'bold',
                color: item.color,
                fontSize: '16px'
              }}>
                {item.percentage}%
              </Typography>
              <Typography variant="caption" sx={{ 
                color: isDark ? '#cccccc' : '#666666',
                display: 'block'
              }}>
                {item.category}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: isDark ? '#999999' : '#888888'
              }}>
                ({item.count} events)
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrialJourneyAePieChart;