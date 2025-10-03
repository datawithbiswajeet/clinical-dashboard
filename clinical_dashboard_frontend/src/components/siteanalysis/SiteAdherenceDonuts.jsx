import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchAdherenceDistribution } from '../../API';
import { Box, CircularProgress, Typography, useTheme, Card, CardContent, Grid } from '@mui/material';

const SiteAdherenceRadialBars = ({ data, title = "Adherence Distribution by Site" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for testing
  const mockData = [
    { s_sitename: "AIIMS Bangalore", adherence_category: "High", patient_count: 537 },
    { s_sitename: "AIIMS Bangalore", adherence_category: "Medium", patient_count: 118 },
    { s_sitename: "AIIMS Bangalore", adherence_category: "Low", patient_count: 64 },
    { s_sitename: "AIIMS Delhi", adherence_category: "High", patient_count: 904 },
    { s_sitename: "AIIMS Delhi", adherence_category: "Medium", patient_count: 53 },
    { s_sitename: "AIIMS Delhi", adherence_category: "Low", patient_count: 25 },
    { s_sitename: "AIIMS Jodhpur", adherence_category: "High", patient_count: 232 },
    { s_sitename: "AIIMS Jodhpur", adherence_category: "Medium", patient_count: 106 },
    { s_sitename: "AIIMS Jodhpur", adherence_category: "Low", patient_count: 82 },
    { s_sitename: "AIIMS Patna", adherence_category: "High", patient_count: 531 },
    { s_sitename: "AIIMS Patna", adherence_category: "Medium", patient_count: 109 },
    { s_sitename: "AIIMS Patna", adherence_category: "Low", patient_count: 69 },
  ];

  useEffect(() => {
    setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 1000);
  }, [data]);

  // Group data by site
  const sites = [...new Set(chartData.map(item => item.s_sitename))];
  
  // Create chart data for each site
  const siteCharts = sites.map(site => {
    const siteData = chartData.filter(item => item.s_sitename === site);
    const total = siteData.reduce((sum, item) => sum + item.patient_count, 0);
    
    const percentages = siteData.map(item => 
      Math.round((item.patient_count / total) * 100)
    );
    
    return {
      siteName: site,
      counts: siteData.map(item => item.patient_count),
      percentages: percentages,
      total: total
    };
  });

  const getRadialOptions = (siteName, percentages) => ({
    chart: {
      height: 280,
      type: 'radialBar',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      },
      dropShadow: {
        enabled: true,
        blur: 4,
        left: 1,
        top: 1,
        opacity: 0.15
      }
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: false,
        startAngle: 0,
        endAngle: 360,
        offsetX: 0,
        offsetY: 0,
        hollow: {
          margin: 5,
          size: '40%',
          background: 'transparent',
          image: undefined,
          imageWidth: 150,
          imageHeight: 150,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageClipped: true,
          position: 'front',
          dropShadow: {
            enabled: false,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1
          }
        },
        track: {
          show: true,
          startAngle: undefined,
          endAngle: undefined,
          background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f0f0f0',
          strokeWidth: '100%',
          opacity: 1,
          margin: 8,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '13px',
            fontWeight: 600,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
            offsetY: 5,
            formatter: function (val) {
              return val + '%';
            }
          },
          total: {
            show: true,
            label: 'HIGH',
            color: '#10b981',
            fontSize: '14px',
            fontWeight: 'bold',
            formatter: function (w) {
              return w.globals.series[0] + '%';
            }
          }
        }
      }
    },
    colors: ['#10b981', '#f59e0b', '#ef4444'],
    stroke: {
      lineCap: 'round'
    },
    labels: ['High', 'Medium', 'Low'],
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '12px',
      fontWeight: 600,
      markers: {
        size: 8,
        shape: 'circle'
      },
      labels: {
        colors: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#34d399', '#fbbf24', '#f87171'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 250
        }
      }
    }]
  });

  if (loading) {
    return (
      <Card sx={{ 
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.1)',
        p: 3,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(50,50,50,0.7) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.8) 100%)',
        backdropFilter: 'blur(10px)',
      }}>
        <CardContent>
          <Typography variant="h5" sx={{ 
            mb: 4, 
            textAlign: 'center', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {title}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '400px'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  color: '#10b981',
                  filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4))',
                  mb: 2
                }} 
              />
              <Typography variant="h6" sx={{ 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                fontWeight: 600
              }}>
                Loading Adherence Data...
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      borderRadius: 3,
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 8px 40px rgba(0,0,0,0.4)'
        : '0 8px 40px rgba(0,0,0,0.15)',
      p: 3,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(50,50,50,0.7) 100%)'
        : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.8) 100%)',
      backdropFilter: 'blur(12px)',
      border: theme.palette.mode === 'dark' 
        ? '1px solid rgba(255,255,255,0.15)'
        : '1px solid rgba(0,0,0,0.08)'
    }}>
      <CardContent>
        <Typography variant="h5" sx={{ 
          mb: 4, 
          textAlign: 'center', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {title}
        </Typography>
        
        {/* 2x2 Grid Layout */}
        <Grid container spacing={3}>
          {siteCharts.map((siteChart, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 3,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.02)',
                borderRadius: 3,
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 12px 40px rgba(0,0,0,0.4)'
                    : '0 12px 40px rgba(0,0,0,0.15)',
                }
              }}>
                {/* Site Name Header */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                    fontSize: '18px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)'
                      : 'linear-gradient(135deg, #1e3a2f 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {siteChart.siteName}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    Total: {siteChart.total} Patients
                  </Typography>
                </Box>

                {/* Radial Bar Chart */}
                <Box sx={{ flex: 1, minHeight: '250px' }}>
                  <Chart
                    options={getRadialOptions(siteChart.siteName, siteChart.percentages)}
                    series={siteChart.percentages}
                    type="radialBar"
                    height={280}
                  />
                </Box>

                {/* Patient Count Summary */}
                <Box sx={{ 
                  mt: 2,
                  p: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                  borderRadius: 2,
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 700, fontSize: '12px' }}>
                        High
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '14px' }}>
                        {siteChart.counts[0]}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '12px' }}>
                        Medium
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '14px' }}>
                        {siteChart.counts[1]}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 700, fontSize: '12px' }}>
                        Low
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '14px' }}>
                        {siteChart.counts[2]}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SiteAdherenceRadialBars;