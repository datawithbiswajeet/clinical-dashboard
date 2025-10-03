import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchDropoutTrend } from '../../API';
import { Box, CircularProgress, useTheme, Typography } from '@mui/material';

const DropoutTrendChart = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDropoutTrend()
      .then(response => {
        console.log('Dropout Trend Data:', response.data);
        setChartData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching dropout trend:", error);
        setLoading(false);
      });
  }, []);

  // Sort months in correct order
  const monthOrder = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };

  const sortedData = [...chartData].sort((a, b) => {
    const monthA = a.month_name.split(' ')[0];
    const monthB = b.month_name.split(' ')[0];
    return monthOrder[monthA] - monthOrder[monthB];
  });

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '450px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)'
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
      type: 'area',
      height: 350,
      toolbar: { show: false },
      animations: { 
        enabled: true, 
        easing: 'easeinout', 
        speed: 800 
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 10,
        color: '#065f46',
        opacity: 0.25
      }
    },
    colors: ['#065f46'],
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#065f46']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#10b981'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return Math.round(val) + '%';
      },
      background: {
        enabled: false,
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#065f46'],
        fontFamily: 'Inter, sans-serif'
      },
      offsetY: -8,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 3,
        color: '#fff',
        opacity: 1
      }
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: '#065f46',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      fillOpacity: 1,
      hover: {
        size: 6,
      }
    },
    xaxis: {
      categories: sortedData.map(item => item.month_name),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif'
        },
        rotate: 0
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      offsetX: 20,
    },
    yaxis: {
      show: true,
      floating: true,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '15px',
          fontFamily: 'Inter, sans-serif'
        },
        formatter: function(val) {
          return Math.round(val) + '%';
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      min: 0,
      max: function(max) {
        return max * 2.15;
      }
    },
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.05)',
      strokeDashArray: 3,
      padding: {
        top: 20,
        right: 10,
        bottom: 5,
        left: 10
      }
    },
    plotOptions: {
      area: {
        fillTo: 'end'
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif'
      },
      y: {
        formatter: function(val) {
          return val.toFixed(1) + '%';
        },
        title: {
          formatter: function() {
            return 'Dropout Rate:';
          }
        }
      },
      marker: {
        show: true
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.15
        }
      }
    }
  };

  const series = [{
    name: 'Dropout Rate',
    data: sortedData.map(item => (item.dropout_percentage || 0))
  }];

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      position: 'relative',
      padding: '20px 15px 15px 15px'
    }}>
      {/* Animated Background Effect */}
      <Box sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        background: 'linear-gradient(135deg, rgba(6, 95, 70, 0.03) 0%, rgba(16, 185, 129, 0.01) 100%)',
        borderRadius: '16px',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      {/* Main Chart - Removed the custom legend from here */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1,
        margin: '0 auto'
      }}>
        <Chart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default DropoutTrendChart;