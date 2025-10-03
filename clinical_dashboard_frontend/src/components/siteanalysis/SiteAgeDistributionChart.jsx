import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchAgeDistribution } from '../../API';
import { Box, CircularProgress, useTheme, Typography } from '@mui/material';

const SiteAgeDistributionChart = ({ data, title = "Active Patients by Age Group" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
      setLoading(false);
    } else {
      fetchAgeDistribution()
        .then(response => {
          setChartData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching age distribution data:", error);
          setLoading(false);
        });
    }
  }, [data]);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: { 
        show: false 
      },
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
        columnWidth: '85%', // Ultra-wide bars
        barHeight: '95%',
        dataLabels: {
          position: 'top',
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) { return val; },
      offsetY: -30,
      style: { 
        fontSize: '14px', 
        fontWeight: 'bold', 
        colors: ['#000000'] // Black color for visibility
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 8,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ffffff',
        opacity: 0.95,
        dropShadow: {
          enabled: true,
          top: 3,
          left: 3,
          blur: 4,
          color: '#000000',
          opacity: 0.25
        }
      }
    },
    xaxis: {
      categories: chartData.map(item => item.age_bucket),
      labels: { 
        style: { 
          fontSize: '13px', 
          fontWeight: 700,
          colors: '#1e3a2f'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: {
        text: 'Age Groups',
        style: {
          color: '#1e3a2f',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      }
    },
    yaxis: {
      show: false,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
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
        opacityFrom: 1,
        opacityTo: 0.7,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#f59e0b',
            opacity: 1
          },
          {
            offset: 100,
            color: '#fbbf24',
            opacity: 0.8
          }
        ]
      }
    },
    colors: ['#f59e0b'], // Your original amber color
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return val + " patients";
        }
      },
      style: {
        fontSize: '14px',
        fontFamily: 'inherit'
      }
    },
    title: {
      text: title, // Title restored
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e3a2f',
        fontFamily: 'inherit'
      }
    },
  };

  const chartSeries = [{
    name: 'Active Patients',
    data: chartData.map(item => item.active_patients)
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
          size={60} 
          sx={{ 
            color: '#f59e0b',
            filter: 'drop-shadow(0 4px 12px rgba(245, 158, 11, 0.3))'
          }} 
        />
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
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease'
      },
      transition: 'all 0.3s ease'
    }}>
      
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
    </Box>
  );
};

export default SiteAgeDistributionChart;