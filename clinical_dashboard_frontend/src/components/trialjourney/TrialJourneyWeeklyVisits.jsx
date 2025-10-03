import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress, Typography, useTheme, Alert, Paper } from '@mui/material';

const TrialJourneyMonthlyVisits = ({ title = "Monthly Site Visits Trend Analysis" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data from January to August (monthly basis)
  const mockData = [
    // January
    { s_sitename: "AIIMS Bangalore", month_name: "January", month_no: 1, month_label: "January", total_visits: 20 },
    { s_sitename: "AIIMS Delhi", month_name: "January", month_no: 1, month_label: "January", total_visits: 9 },
    { s_sitename: "AIIMS Jodhpur", month_name: "January", month_no: 1, month_label: "January", total_visits: 6 },
    { s_sitename: "AIIMS Patna", month_name: "January", month_no: 1, month_label: "January", total_visits: 14 },
    
    // February
    { s_sitename: "AIIMS Bangalore", month_name: "February", month_no: 2, month_label: "February", total_visits: 24 },
    { s_sitename: "AIIMS Delhi", month_name: "February", month_no: 2, month_label: "February", total_visits: 34 },
    { s_sitename: "AIIMS Jodhpur", month_name: "February", month_no: 2, month_label: "February", total_visits: 12 },
    { s_sitename: "AIIMS Patna", month_name: "February", month_no: 2, month_label: "February", total_visits: 42 },
    
    // March
    { s_sitename: "AIIMS Bangalore", month_name: "March", month_no: 3, month_label: "March", total_visits: 43 },
    { s_sitename: "AIIMS Delhi", month_name: "March", month_no: 3, month_label: "March", total_visits: 88 },
    { s_sitename: "AIIMS Jodhpur", month_name: "March", month_no: 3, month_label: "March", total_visits: 27 },
    { s_sitename: "AIIMS Patna", month_name: "March", month_no: 3, month_label: "March", total_visits: 59 },
    
    // April
    { s_sitename: "AIIMS Bangalore", month_name: "April", month_no: 4, month_label: "April", total_visits: 91 },
    { s_sitename: "AIIMS Delhi", month_name: "April", month_no: 4, month_label: "April", total_visits: 103 },
    { s_sitename: "AIIMS Jodhpur", month_name: "April", month_no: 4, month_label: "April", total_visits: 55 },
    { s_sitename: "AIIMS Patna", month_name: "April", month_no: 4, month_label: "April", total_visits: 75 },
    
    // May
    { s_sitename: "AIIMS Bangalore", month_name: "May", month_no: 5, month_label: "May", total_visits: 133 },
    { s_sitename: "AIIMS Delhi", month_name: "May", month_no: 5, month_label: "May", total_visits: 165 },
    { s_sitename: "AIIMS Jodhpur", month_name: "May", month_no: 5, month_label: "May", total_visits: 84 },
    { s_sitename: "AIIMS Patna", month_name: "May", month_no: 5, month_label: "May", total_visits: 118 },
    
    // June
    { s_sitename: "AIIMS Bangalore", month_name: "June", month_no: 6, month_label: "June", total_visits: 205 },
    { s_sitename: "AIIMS Delhi", month_name: "June", month_no: 6, month_label: "June", total_visits: 257 },
    { s_sitename: "AIIMS Jodhpur", month_name: "June", month_no: 6, month_label: "June", total_visits: 102 },
    { s_sitename: "AIIMS Patna", month_name: "June", month_no: 6, month_label: "June", total_visits: 190 },
    
    // July
    { s_sitename: "AIIMS Bangalore", month_name: "July", month_no: 7, month_label: "July", total_visits: 300 },
    { s_sitename: "AIIMS Delhi", month_name: "July", month_no: 7, month_label: "July", total_visits: 375 },
    { s_sitename: "AIIMS Jodhpur", month_name: "July", month_no: 7, month_label: "July", total_visits: 157 },
    { s_sitename: "AIIMS Patna", month_name: "July", month_no: 7, month_label: "July", total_visits: 269 },
    
    // August
    { s_sitename: "AIIMS Bangalore", month_name: "August", month_no: 8, month_label: "August", total_visits: 471 },
    { s_sitename: "AIIMS Delhi", month_name: "August", month_no: 8, month_label: "August", total_visits: 680 },
    { s_sitename: "AIIMS Jodhpur", month_name: "August", month_no: 8, month_label: "August", total_visits: 307 },
    { s_sitename: "AIIMS Patna", month_name: "August", month_no: 8, month_label: "August", total_visits: 485 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use mock data for now
        setTimeout(() => {
          setChartData(mockData);
          setLoading(false);
        }, 1000);

      } catch (err) {
        console.error("Error fetching monthly visits data:", err);
        setError("Failed to load monthly visits data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process data for multi-line chart
  const prepareChartData = () => {
    if (!chartData || chartData.length === 0) {
      return { series: [], categories: [] };
    }

    // Get unique sites and month labels
    const sites = [...new Set(chartData.map(item => item.s_sitename))];
    
    // Create sorted month labels from January to August
    const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

    // Create series for each site
    const series = sites.map(site => {
      const siteData = chartData.filter(item => item.s_sitename === site);
      
      // Fill in missing months with 0
      const data = monthLabels.map(monthLabel => {
        const monthData = siteData.find(item => item.month_label === monthLabel);
        return monthData ? monthData.total_visits : 0;
      });

      return {
        name: site,
        data: data
      };
    });

    return { series, categories: monthLabels, sites };
  };

  const { series, categories } = prepareChartData();

  // Light transparent colors (80-90% transparency)
  const lightTransparentColors = [
    'rgba(16, 185, 129, 0.85)',  // Emerald
    'rgba(59, 130, 246, 0.85)',  // Blue
    'rgba(245, 158, 11, 0.85)',  // Amber
    'rgba(239, 68, 68, 0.85)',   // Red
    'rgba(139, 92, 246, 0.85)',  // Purple
    'rgba(6, 182, 212, 0.85)',   // Cyan
    'rgba(132, 204, 22, 0.85)',  // Lime
    'rgba(249, 115, 22, 0.85)'   // Orange
  ];

  const chartOptions = {
    chart: {
      type: 'line',
      height: 500,
      toolbar: {
        show: false // Remove toolbar including zoom
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      lineCap: 'round'
    },
    markers: {
      size: 6,
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
          fontSize: '14px',
          fontWeight: 600
        }
      },
      axisBorder: {
        show: true,
        color: theme.palette.mode === 'dark' ? '#555' : '#ddd'
      },
      axisTicks: {
        show: true,
        color: theme.palette.mode === 'dark' ? '#555' : '#ddd'
      },
      title: {
        text: 'Monthly Trends',
        style: {
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Visits',
        style: {
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
          fontSize: '16',
          fontWeight: 'bold'
        }
      },
      labels: {
        style: {
          colors: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
          fontSize: '16px'
        }
      }
    },
    grid: {
      borderColor: theme.palette.mode === 'dark' ? '#444' : '#e0e0e0',
      strokeDashArray: 4,
      padding: {
        top: 20,
        right: 30,
        bottom: 10,
        left: 20
      }
    },
    colors: lightTransparentColors,
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 700,
      labels: {
        colors: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
      },
      markers: {
        width: 16,
        height: 16,
        radius: 8,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 10
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return `${val} visits`;
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 400
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Paper elevation={3} sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '500px',
        p: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: '16px'
      }}>
        <CircularProgress 
          size={70} 
          sx={{ 
            color: '#3b82f6',
            mb: 2
          }} 
        />
        <Typography variant="h6" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f', fontWeight: 600 }}>
          Loading Monthly Visits Data...
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666', mt: 1 }}>
          Preparing time-series analysis
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ 
      width: '100%',
      maxWidth: '3000px', // Increased max width
      margin: '0 auto',
      p: 4,
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)',
      borderRadius: '16px',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 8px 40px rgba(0,0,0,0.4)'
        : '0 8px 40px rgba(0,0,0,0.1)',
    }}>
      {/* Centered Title */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.75rem', md: '2.125rem' }
        }}>
          {title}
        </Typography>
      </Box>

      {/* Chart with increased width */}
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={500}
          width="100%"
        />
      </Box>
    </Paper>
  );
};

export default TrialJourneyMonthlyVisits;