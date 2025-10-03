import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, CircularProgress, Typography, useTheme, Card, CardContent, Grid } from '@mui/material';

const TrialJourneyScreeningRadial = ({ 
  data, 
  title = "Screening Overview Analysis" 
}) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    screeningResults: [],
    failureReasons: [],
    screeningSources: []
  });
  const [loading, setLoading] = useState(true);

  // Mock data structure matching your API endpoints
  const mockData = {
    screeningResults: [
      { scr_screenresult: "Passed", result_count: 3309 },
      { scr_screenresult: "Failed", result_count: 1691 }
    ],
    failureReasons: [
      { scr_reasonforfailure: "Lab Abnormality", result_count: 1169 },
      { scr_reasonforfailure: "Consent Withdrawn", result_count: 200 },
      { scr_reasonforfailure: "Medical History Exclusion", result_count: 170 },
      { scr_reasonforfailure: "Inclusion Criteria Not Met", result_count: 152 }
    ],
    screeningSources: [
      { scr_sourcecrf: "Hospital Referral", result_count: 1688 },
      { scr_sourcecrf: "Community Outreach", result_count: 1690 },
      { scr_sourcecrf: "Self Referred", result_count: 1622 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (data) {
        setChartData(data);
      } else {
        setChartData(mockData);
      }
      setLoading(false);
    }, 1000);
  }, [data]);

  // Process data for radial charts
  const processRadialData = (data, type) => {
    const total = data.reduce((sum, item) => sum + item.result_count, 0);
    
    return data.map(item => ({
      label: item[type] || 'Unknown',
      count: item.result_count,
      percentage: Math.round((item.result_count / total) * 100)
    }));
  };

  const screeningResultsData = processRadialData(chartData.screeningResults, 'scr_screenresult');
  const failureReasonsData = processRadialData(chartData.failureReasons, 'scr_reasonforfailure');
  const screeningSourcesData = processRadialData(chartData.screeningSources, 'scr_sourcecrf');

  const radialCharts = [
    {
      title: "Screening Results",
      data: screeningResultsData,
      colors: ['#10b981', '#ef4444'],
      labels: screeningResultsData.map(item => item.label),
      total: screeningResultsData.reduce((sum, item) => sum + item.count, 0),
      showCenterText: true
    },
    {
      title: "Failure Reasons",
      data: failureReasonsData,
      colors: ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
      labels: failureReasonsData.map(item => item.label),
      total: failureReasonsData.reduce((sum, item) => sum + item.count, 0),
      showCenterText: true
    },
    {
      title: "Screening Sources",
      data: screeningSourcesData,
      colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#84cc16'],
      labels: screeningSourcesData.map(item => item.label),
      total: screeningSourcesData.reduce((sum, item) => sum + item.count, 0),
      showCenterText: false // Hide center text for the third chart
    }
  ];

  const getRadialOptions = (chartConfig, index) => ({
    chart: {
      height: 280,
      type: 'radialBar',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: index * 150
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
          background: 'transparent'
        },
        track: {
          show: true,
          background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f0f0f0',
          strokeWidth: '100%',
          opacity: 1,
          margin: 8
        },
        dataLabels: {
          show: chartConfig.showCenterText, // Hide center text based on config
          name: {
            show: chartConfig.showCenterText,
            fontSize: '10px',
            fontWeight: 600,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
            offsetY: -10,
          },
          value: {
            show: chartConfig.showCenterText,
            fontSize: '10px',
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
            offsetY: 5,
            formatter: function (val) {
              return val + '%';
            }
          },
          total: {
            show: chartConfig.showCenterText,
            label: chartConfig.data[0]?.label || 'TOTAL',
            color: chartConfig.colors[0],
            fontSize: '14px',
            fontWeight: 'bold'
          }
        }
      }
    },
    colors: chartConfig.colors,
    stroke: {
      lineCap: 'round'
    },
    labels: chartConfig.labels,
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
        gradientToColors: chartConfig.colors.map(color => color + '80'),
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    }
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
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
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
                  color: '#3b82f6',
                  filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))',
                  mb: 2
                }} 
              />
              <Typography variant="h6" sx={{ 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                fontWeight: 600
              }}>
                Loading Screening Data...
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
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {title}
        </Typography>
        
        {/* 3-column Grid Layout */}
        <Grid container spacing={3}>
          {radialCharts.map((chartConfig, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                {/* Chart Title */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                    fontSize: '18px',
                    background: `linear-gradient(135deg, ${chartConfig.colors[0]} 0%, ${chartConfig.colors[1] || chartConfig.colors[0]} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {chartConfig.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    Total: {chartConfig.total} Records
                  </Typography>
                </Box>

                {/* Radial Bar Chart */}
                <Box sx={{ flex: 1, minHeight: '280px' }}>
                  <Chart
                    options={getRadialOptions(chartConfig, index)}
                    series={chartConfig.data.map(item => item.percentage)}
                    type="radialBar"
                    height={280}
                  />
                </Box>

                {/* Count Summary */}
                <Box sx={{ 
                  mt: 2,
                  p: 2,
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, rgba(${parseInt(chartConfig.colors[0].slice(1, 3), 16)}, ${parseInt(chartConfig.colors[0].slice(3, 5), 16)}, ${parseInt(chartConfig.colors[0].slice(5, 7), 16)}, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)`
                    : `linear-gradient(135deg, rgba(${parseInt(chartConfig.colors[0].slice(1, 3), 16)}, ${parseInt(chartConfig.colors[0].slice(3, 5), 16)}, ${parseInt(chartConfig.colors[0].slice(5, 7), 16)}, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)`,
                  borderRadius: 2,
                  border: theme.palette.mode === 'dark'
                    ? `1px solid ${chartConfig.colors[0]}80`
                    : `1px solid ${chartConfig.colors[0]}40`
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 1 }}>
                    {chartConfig.data.map((item, idx) => (
                      <Box key={idx} sx={{ textAlign: 'center', minWidth: '60px' }}>
                        <Typography variant="body2" sx={{ 
                          color: chartConfig.colors[idx], 
                          fontWeight: 700, 
                          fontSize: '10px',
                          lineHeight: 1.2
                        }}>
                          {item.label.split(' ').map(word => word.charAt(0)).join('').toUpperCase()}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '12px' }}>
                          {item.count}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666' }}>
                          {item.percentage}%
                        </Typography>
                      </Box>
                    ))}
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

export default TrialJourneyScreeningRadial;