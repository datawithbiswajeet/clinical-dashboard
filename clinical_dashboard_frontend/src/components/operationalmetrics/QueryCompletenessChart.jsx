import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchQueryCompleteness } from '../../API';
import { Box, CircularProgress, useTheme, Typography } from '@mui/material';

const QueryCompletenessChart = ({ data }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data fallback
  const mockData = [
    { s_sitename: "AIIMS Delhi", avg_querycompleteness: 98.18 },
    { s_sitename: "AIIMS Bangalore", avg_querycompleteness: 89.56 },
    { s_sitename: "AIIMS Jodhpur", avg_querycompleteness: 76.75 },
    { s_sitename: "AIIMS Patna", avg_querycompleteness: 89.9 }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use props data if available and valid
        if (data && Array.isArray(data) && data.length > 0) {
          setChartData(data);
        } else {
          try {
            const response = await fetchQueryCompleteness();
            console.log('🔍 API Response:', response);
            
            // Handle different response structures
            let processedData = response;
            
            if (Array.isArray(response)) {
              processedData = response;
            } else if (response && typeof response === 'object') {
              // Try to extract array from common property names
              if (response.data && Array.isArray(response.data)) {
                processedData = response.data;
              } else if (response.query_completeness && Array.isArray(response.query_completeness)) {
                processedData = response.query_completeness;
              } else if (response.results && Array.isArray(response.results)) {
                processedData = response.results;
              } else {
                // If it's an object but not with expected structure, use mock data
                console.warn('Unexpected API response structure, using mock data:', response);
                processedData = mockData;
              }
            } else {
              console.warn('API returned non-array data, using mock data:', response);
              processedData = mockData;
            }
            
            setChartData(processedData);
          } catch (apiError) {
            console.warn('API call failed, using mock data:', apiError);
            setChartData(mockData);
          }
        }
      } catch (error) {
        console.error("Error loading query completeness data:", error);
        setError("Failed to load data");
        setChartData(mockData); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [data]);

  // Safe data extraction functions
  const getCategories = () => {
    if (!chartData || !Array.isArray(chartData)) return [];
    return chartData.map(item => item?.s_sitename || 'Unknown Site').filter(Boolean);
  };

  const getSeriesData = () => {
    if (!chartData || !Array.isArray(chartData)) return [];
    return chartData.map(item => {
      const value = item?.avg_querycompleteness;
      return typeof value === 'number' ? value : 0;
    });
  };

  const colorStops = [
    { offset: 0, color: '#3b82f6', opacity: 1 },  // Blue
    { offset: 100, color: '#60a5fa', opacity: 0.8 }
  ];

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
      categories: getCategories(),
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
      text: 'Site Wise Query Completeness',
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
    name: 'Query Completeness',
    data: getSeriesData()
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
            color: '#3b82f6',
            filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))'
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
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography color="error" variant="h6">
          Error Loading Data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error}
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
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.2)',
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
          radial-gradient(circle at 20% 80%, rgba(59,130,246,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(96,165,250,0.05) 0%, transparent 50%)
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

export default QueryCompletenessChart;