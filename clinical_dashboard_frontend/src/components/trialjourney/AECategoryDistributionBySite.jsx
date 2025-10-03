import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress, Typography, useTheme, Alert, Paper, Grid, Card, CardContent } from '@mui/material';
import { TrendingUp, Warning, Info, LocalHospital, CheckCircle } from '@mui/icons-material';

const AECategoryDistributionBySite = ({ title = "AE Category Distribution Across Sites" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAEs, setTotalAEs] = useState(0);

  // Define severity categories outside to avoid undefined errors
  const severityCategories = [
    { 
      key: 'Mild', 
      name: 'Mild', 
      color: '#006400',
      gradient: ['#006400', '#9ef01a']
    },
    { 
      key: 'Moderate', 
      name: 'Moderate', 
      color: '#ff8800',
      gradient: ['#ff8800', '#fbbf24']
    },
    { 
      key: 'Severe', 
      name: 'Severe', 
      color: '#9d0208',
      gradient: ['#9d0208', '#e5383b']
    }
  ];

  // Direct mock data - no API calls
  const mockData = [
    { site: "AIIMS Bangalore", category: "Mild", count: 19 },
    { site: "AIIMS Bangalore", category: "Moderate", count: 50 },
    { site: "AIIMS Bangalore", category: "Severe", count: 15 },
    { site: "AIIMS Delhi", category: "Mild", count: 24 },
    { site: "AIIMS Delhi", category: "Moderate", count: 79 },
    { site: "AIIMS Delhi", category: "Severe", count: 27 },
    { site: "AIIMS Jodhpur", category: "Mild", count: 9 },
    { site: "AIIMS Jodhpur", category: "Moderate", count: 14 },
    { site: "AIIMS Jodhpur", category: "Severe", count: 21 },
    { site: "AIIMS Patna", category: "Mild", count: 15 },
    { site: "AIIMS Patna", category: "Moderate", count: 52 },
    { site: "AIIMS Patna", category: "Severe", count: 16 },
  ];

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setChartData(mockData);
      const total = mockData.reduce((sum, item) => sum + item.count, 0);
      setTotalAEs(total);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Transform data for chart with safe defaults
  const prepareChartData = () => {
    if (!chartData || chartData.length === 0) {
      return { series: [], categories: [], severityCategories };
    }

    try {
      // Get unique sites safely
      const sites = [...new Set(chartData.map(item => item.site))].filter(Boolean);
      
      // Create series for each AE category safely
      const series = severityCategories.map(category => ({
        name: category.name,
        data: sites.map(site => {
          const record = chartData.find(item => 
            item.site === site && item.category === category.key
          );
          return record ? (record.count || 0) : 0;
        }),
        color: category.color
      }));

      return { series, categories: sites, severityCategories };
    } catch (error) {
      console.error('Error preparing chart data:', error);
      return { series: [], categories: [], severityCategories };
    }
  };

  const { series = [], categories = [], severityCategories: chartSeverityCategories = severityCategories } = prepareChartData();

  // Calculate statistics safely
  const calculateStats = () => {
    if (!chartData.length) return null;
    
    try {
      const siteTotals = categories.map(site => {
        const siteData = chartData.filter(item => item.site === site);
        const total = siteData.reduce((sum, item) => sum + (item.count || 0), 0);
        const severeCount = siteData.find(item => item.category === 'Severe')?.count || 0;
        const severePercentage = total > 0 ? (severeCount / total) * 100 : 0;
        
        return { site, total, severeCount, severePercentage };
      });

      if (siteTotals.length === 0) return null;

      const maxSite = siteTotals.reduce((max, item) => item.total > max.total ? item : max, siteTotals[0]);
      const maxSevereSite = siteTotals.reduce((max, item) => item.severePercentage > max.severePercentage ? item : max, siteTotals[0]);

      return { maxSite, maxSevereSite };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return null;
    }
  };

  const stats = calculateStats();

  // Safe chart options - DATA LABELS WITH BLACK FONT COLOR
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: true,
        tools: {
          download: true,
          reset: true
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: '30%',
        endingShape: 'rounded',
        dataLabels: {
          position: 'top', // Labels on top of bars
        },
      },
    },
    // DATA LABELS WITH BLACK FONT COLOR
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val > 0 ? val : '';
      },
      offsetY: -20, // Position above the bars
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#000000'], // BLACK FONT COLOR
        fontFamily: 'inherit'
      },
      background: {
        enabled: false, // No background for cleaner look
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '13px',
          fontWeight: 600,
          colors: theme.palette.mode === 'dark' ? '#e2e8f0' : '#475569'
        }
      },
      axisBorder: {
        show: true,
        color: theme.palette.mode === 'dark' ? '#475569' : '#cbd5e1'
      },
      axisTicks: {
        show: true,
        color: theme.palette.mode === 'dark' ? '#475569' : '#cbd5e1'
      },
      title: {
        text: 'Medical Sites',
        style: {
          color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#475569',
          fontSize: '14px',
          fontWeight: '600'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Adverse Events',
        style: {
          color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#475569',
          fontSize: '14px',
          fontWeight: '600'
        }
      },
      labels: {
        style: {
          colors: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
          fontWeight: 500
        }
      }
    },
    grid: {
      borderColor: theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
      strokeDashArray: 5,
      padding: {
        top: 20,
        right: 30,
        bottom: 0,
        left: 20
      }
    },
    colors: chartSeverityCategories.map(cat => cat.color),
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: chartSeverityCategories.map(cat => cat.gradient[1]),
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0, 100]
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '13px',
      fontWeight: 600,
      labels: {
        colors: theme.palette.mode === 'dark' ? '#e2e8f0' : '#475569'
      },
      markers: {
        width: 16,
        height: 16,
        radius: 8
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: function (val) {
          return `${val} Adverse Events`;
        }
      }
    }
  };

  if (loading) {
    return (
      <Paper elevation={0} sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '600px',
        p: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '20px',
        border: theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#10b981',
            mb: 2
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#475569',
            fontWeight: 600
          }}
        >
          Loading AE Distribution...
        </Typography>
      </Paper>
    );
  }

  // Check if we have valid data to display
  if (series.length === 0 || categories.length === 0) {
    return (
      <Paper elevation={0} sx={{ 
        width: '100%',
        p: 4,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '20px',
        border: theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <Alert severity="info" sx={{ width: '100%' }}>
          No data available for AE category distribution. Please check your data source.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ 
      width: '100%',
      p: 4,
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)'
              : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b'
          }}
        >
          Distribution of Adverse Events by severity across {categories.length} medical sites
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #065f46 0%, #047857 100%)'
              : 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderRadius: '12px'
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <CheckCircle sx={{ color: '#065f46', mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="#065f46">
                  Total AEs
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight={800} color="#065f46">
                {totalAEs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #92400e 0%, #b45309 100%)'
              : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px'
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <TrendingUp sx={{ color: '#92400e', mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="#92400e">
                  Highest Volume
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={800} color="#92400e">
                {stats?.maxSite?.total || 0}
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#92400e">
                {stats?.maxSite?.site || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)'
              : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px'
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Warning sx={{ color: '#7c2d12', mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="#7c2d12">
                  Highest Severity
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={800} color="#7c2d12">
                {stats?.maxSevereSite?.severePercentage?.toFixed(1) || 0}%
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#7c2d12">
                {stats?.maxSevereSite?.site || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Chart */}
      <Box sx={{ 
        width: '100%',
        position: 'relative'
      }}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={500}
        />
      </Box>

      {/* Legend */}
      <Box sx={{ 
        mt: 3,
        p: 2,
        borderRadius: '12px',
        background: theme.palette.mode === 'dark' 
          ? 'rgba(30, 41, 59, 0.5)'
          : 'rgba(248, 250, 252, 0.8)',
        border: theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <Grid container spacing={2} justifyContent="center">
          {chartSeverityCategories.map((category, index) => (
            <Grid item key={category.key}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 16,
                    height: 16,
                    borderRadius: '4px',
                    background: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})`,
                    mr: 1
                  }}
                />
                <Typography variant="body2" fontWeight={600}>
                  {category.name}: {(series[index]?.data?.reduce((a, b) => a + b, 0)) || 0}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default AECategoryDistributionBySite;