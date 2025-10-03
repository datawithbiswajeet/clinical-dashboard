import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchTimeliness } from '../../API';
import { Box, CircularProgress, useTheme, Typography } from '@mui/material';

const TimelinessChart = ({ data }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (data && Array.isArray(data) && data.length > 0) {
          console.log('Using prop data:', data);
          setChartData(data);
        } else {
          console.log('Fetching data from API...');
          const response = await fetchTimeliness();
          console.log('API Response:', response);
          console.log('Response type:', typeof response);
          console.log('Is array?', Array.isArray(response));

          let dataArray = [];

          // Handle different response formats
          if (Array.isArray(response)) {
            dataArray = response;
          } else if (response && Array.isArray(response.data)) {
            dataArray = response.data;
          } else if (response && response.data && Array.isArray(response.data.items)) {
            dataArray = response.data.items;
          } else if (response && response.data && typeof response.data === 'object') {
            // If response.data is an object, try to convert it to array
            dataArray = Object.values(response.data);
          } else {
            console.warn('Unexpected API response format, using empty array:', response);
            dataArray = [];
          }

          console.log('Processed data array:', dataArray);
          setChartData(dataArray);
        }
      } catch (err) {
        console.error("Error fetching timeliness data:", err);
        setError(err.message || 'Failed to load data');
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [data]);

  const colorStops = [
    { offset: 0, color: '#f59e0b', opacity: 1 },  // Amber
    { offset: 100, color: '#fbbf24', opacity: 0.8 }
  ];

  // Safe data mapping with fallbacks
  const categories = Array.isArray(chartData) 
    ? chartData.map(item => item?.s_sitename || item?.siteName || item?.name || 'Unknown Site')
    : [];

  const seriesData = Array.isArray(chartData) 
    ? chartData.map(item => {
        const value = item?.avg_timeliness || item?.timeliness || item?.value || 0;
        return typeof value === 'number' ? value : 0;
      })
    : [];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: { show: false },
      animations: { 
        enabled: true, 
        easing: 'easeinout', 
        speed: 800 
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 15,
        borderRadiusApplication: 'end',
        columnWidth: '55%',
        dataLabels: {
          position: 'top',
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) { return val + '%'; },
      offsetY: -20,
      style: { 
        fontSize: '12px', 
        fontWeight: 'bold', 
        colors: ['#1e3a2f']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 8,
        borderWidth: 0,
        opacity: 0.9,
        dropShadow: {
          enabled: false
        }
      }
    },
    xaxis: {
      categories: categories,
      labels: { 
        style: { 
          fontSize: '11px', 
          fontWeight: 600,
          colors: '#1e3a2f'
        },
        rotate: -45
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      show: false,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    grid: {
      show: false,
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
        stops: [0, 100],
        colorStops: colorStops
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return val + '%';
        }
      }
    },
    title: {
      text: 'Avg Resolving Time Site Wise',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1e3a2f'
      }
    },
    noData: {
      text: 'No data available',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        color: '#1e3a2f',
        fontSize: '14px'
      }
    }
  };

  const chartSeries = [{
    name: 'Timeliness',
    data: seriesData
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
            color: '#f59e0b',
            filter: 'drop-shadow(0 4px 12px rgba(245, 158, 11, 0.3))'
          }} 
        />
      </Box>
    );
  }

  if (error) {
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
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <Typography color="error" variant="h6" gutterBottom>
          Error Loading Data
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!Array.isArray(chartData) || chartData.length === 0) {
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
        <Typography variant="h6" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  }

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
        boxShadow: '0 12px 48px rgba(245, 158, 11, 0.2)',
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
          radial-gradient(circle at 20% 80%, rgba(245,158,11,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(251,191,36,0.05) 0%, transparent 50%)
        `,
        animation: 'pulse 4s ease-in-out infinite alternate',
        zIndex: 0
      }} />

      {/* Chart Container */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="100%"
        />
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

export default TimelinessChart;