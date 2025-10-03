import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchMissedVisits } from '../../API';
import { Box, CircularProgress, useTheme } from '@mui/material';

const SiteMissedVisitsChart = ({ data, title = "Missed Visits by Site" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
      setLoading(false);
    } else {
      fetchMissedVisits()
        .then(response => {
          setChartData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching missed visits data:", error);
          setLoading(false);
        });
    }
  }, [data]);

  const sortedData = [...chartData].sort((a, b) => b.missed_visits - a.missed_visits);

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
        horizontal: true,
        borderRadius: 15,
        barHeight: '70%',
        distributed: true,
        dataLabels: {
          position: 'center',
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) { return val; },
      style: { 
        fontSize: '15px', 
        fontWeight: 'bold', 
        colors: ['#fff']
      },
      offsetX: 10
    },
    xaxis: {
      categories: sortedData.map(item => item.s_sitename),
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#1e3a2f',
          fontSize: '11px',
          fontWeight: 600
        }
      }
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    colors: sortedData.map(item => {
      const missed = item.missed_visits;
      if (missed > 100) return '#ef4444';
      if (missed > 80) return '#f97316';
      if (missed > 50) return '#f59e0b';
      if (missed > 5) return '#a9fd21ff';
      return '#84cc16';
    }),
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return val + " missed visits";
        }
      }
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1e3a2f'
      }
    }
  };

  const chartSeries = [{
    name: 'Missed Visits',
    data: sortedData.map(item => item.missed_visits)
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
            color: '#ef4444',
            filter: 'drop-shadow(0 4px 12px rgba(239, 68, 68, 0.3))'
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
        boxShadow: '0 12px 48px rgba(239, 68, 68, 0.2)',
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
          radial-gradient(circle at 20% 80%, rgba(239,68,68,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(249,115,22,0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(245,158,11,0.03) 0%, transparent 50%)
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

export default SiteMissedVisitsChart;