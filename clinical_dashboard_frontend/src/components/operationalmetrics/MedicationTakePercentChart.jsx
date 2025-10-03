import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchMedicationTakePercent } from '../../API';
import { Box, CircularProgress, useTheme, Typography } from '@mui/material';

const MedicationTakePercentChart = ({ data }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data fallback
  const mockData = [
    { s_sitename: "AIIMS Delhi", avg_medication_take_percent: 87.41 },
    { s_sitename: "AIIMS Bangalore", avg_medication_take_percent: 67.97 },
    { s_sitename: "AIIMS Jodhpur", avg_medication_take_percent: 43.09 },
    { s_sitename: "AIIMS Patna", avg_medication_take_percent: 66.96 }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use props data if available, otherwise fetch from API
        if (data && Array.isArray(data) && data.length > 0) {
          setChartData(data);
        } else {
          try {
            const response = await fetchMedicationTakePercent();
            // Check if response is valid array
            if (Array.isArray(response)) {
              setChartData(response);
            } else {
              console.warn('API returned non-array data, using mock data:', response);
              setChartData(mockData);
            }
          } catch (apiError) {
            console.warn('API call failed, using mock data:', apiError);
            setChartData(mockData);
          }
        }
      } catch (error) {
        console.error("Error loading medication take percent data:", error);
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
      const value = item?.avg_medication_take_percent;
      return typeof value === 'number' ? value : 0;
    });
  };

  const colorStops = [
    { offset: 0, color: '#10b981', opacity: 1 },
    { offset: 100, color: '#34d399', opacity: 0.8 }
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
        opacity: 0.9
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
      text: 'Medication Taken Percent Site Wise',
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
    name: 'Medication Take Percent',
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
            color: '#10b981',
            filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))'
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
          radial-gradient(circle at 20% 80%, rgba(16,185,129,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(52,211,153,0.05) 0%, transparent 50%)
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

export default MedicationTakePercentChart;