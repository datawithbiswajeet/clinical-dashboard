import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchGenderDistribution } from '../../API';
import { Box, CircularProgress, Typography, useTheme, Alert, Paper } from '@mui/material';

const SiteGenderGroupedBar = ({ data, title = "Gender Distribution by Site" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for testing - Remove this when your API works
  const mockData = [
    { site: "AIIMS Bangalore", gender: "M", count: 355 },
    { site: "AIIMS Bangalore", gender: "F", count: 345 },
    { site: "AIIMS Bangalore", gender: "Other", count: 19 },
    { site: "AIIMS Delhi", gender: "M", count: 461 },
    { site: "AIIMS Delhi", gender: "F", count: 476 },
    { site: "AIIMS Delhi", gender: "Other", count: 45 },
    { site: "AIIMS Jodhpur", gender: "M", count: 216 },
    { site: "AIIMS Jodhpur", gender: "F", count: 183 },
    { site: "AIIMS Jodhpur", gender: "Other", count: 21 },
    { site: "AIIMS Patna", gender: "M", count: 345 },
    { site: "AIIMS Patna", gender: "F", count: 337 },
    { site: "AIIMS Patna", gender: "Other", count: 27 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use mock data for now - replace with actual API call
        setTimeout(() => {
          setChartData(mockData);
          setLoading(false);
        }, 1000);

        // Uncomment this when your API is ready
        /*
        if (data && data.length > 0) {
          setChartData(data);
        } else {
          const response = await fetchGenderDistribution();
          setChartData(response.data);
        }
        setLoading(false);
        */
      } catch (err) {
        console.error("Error fetching gender distribution data:", err);
        setError("Failed to load gender distribution data");
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  // Transform data for chart
  const prepareChartData = () => {
    if (!chartData || chartData.length === 0) {
      return { series: [], categories: [] };
    }

    console.log('Processing chart data:', chartData);

    // Get unique sites
    const sites = [...new Set(chartData.map(item => item.site || item.s_sitename))].filter(Boolean);
    
    // Define gender order
    const genders = [
      { key: 'M', name: 'Male', color: '#065f46' },
      { key: 'F', name: 'Female', color: '#8b5cf6' },
      { key: 'Other', name: 'Other', color: '#f59e0b' }
    ];

    // Create series for each gender
    const series = genders.map(gender => ({
      name: gender.name,
      data: sites.map(site => {
        const record = chartData.find(item => 
          (item.site === site || item.s_sitename === site) && 
          (item.gender === gender.key || item.p_sex === gender.key || item.sex === gender.key)
        );
        return record ? (record.count || record.patient_count || record.value || 0) : 0;
      }),
      color: gender.color
    }));

    return { series, categories: sites };
  };

  const { series, categories } = prepareChartData();

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
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
        borderRadius: 15, // Increased border radius for rounded tops
        columnWidth: '45%', // Reduced width for more space between groups
        endingShape: 'rounded',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val > 0 ? val : '';
      },
      offsetY: -25,
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
        colors: ['#020000ff']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 6,
        borderWidth: 0,
        opacity: 0.9,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          color: '#000000',
          opacity: 0.45
        }
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
          fontSize: '14px',
          fontWeight: 700,
          colors: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f'
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
        text: 'Medical Sites',
        style: {
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      }
    },
    yaxis: {
      title: {
        text: '', // Removed y-axis title
        style: {
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      },
    },
    grid: {
      borderColor: theme.palette.mode === 'dark' ? '#444' : '#e0e0e0',
      strokeDashArray: 4,
      padding: {
        top: 0,
        right: 30,
        bottom: 0,
        left: 10 // Reduced left padding
      }
    },
    colors: ['#065f46', '#8b5cf6', '#f59e0b'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#10b981', '#a78bfa', '#fbbf24'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 700,
      labels: {
        colors: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
      },
      markers: {
        width: 18,
        height: 18,
        radius: 9,
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
          return `${val} patients`;
        },
        title: {
          formatter: function (seriesName) {
            return `${seriesName}:`;
          }
        }
      }
    },
    title: {
      text: title,
      align: 'center',
      margin: 25,
      offsetY: 15,
      style: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f'
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        dataLabels: {
          enabled: false
        }
      }
    }]
  };

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '500px',
        p: 3
      }}>
        <Alert severity="error" sx={{ width: '100%', maxWidth: '600px' }}>
          {error}
        </Alert>
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
            color: '#10b981',
            mb: 2,
            filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))'
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
            fontWeight: 600
          }}
        >
          Loading Gender Distribution...
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
            mt: 1
          }}
        >
          Preparing site-wise patient data
        </Typography>
      </Paper>
    );
  }

  if (series.length === 0 || categories.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '500px',
        p: 3
      }}>
        <Alert severity="warning" sx={{ width: '100%', maxWidth: '600px' }}>
          No gender distribution data available. Please check your data source.
          <br />
          <strong>Data structure expected:</strong>
          <br />
          site, gender, count fields
        </Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ 
      width: '100%',
      maxWidth: '1500px', // Increased max width for more space
      p: 5, // Increased padding
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      borderRadius: '16px',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 8px 40px rgba(0,0,0,0.4)'
        : '0 8px 40px rgba(0,0,0,0.1)',
    }}>
      <Box sx={{ 
        width: '100%',
        px: 1 // Added horizontal padding for more breathing space
      }}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={500}
        />
      </Box>
      
      {/* Data summary table */}
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', 
        borderRadius: '12px',
        mx: 2 // Added horizontal margin for spacing
      }}>
        <Typography variant="h6" sx={{ 
          mb: 3, 
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f', 
          fontWeight: 600,
          textAlign: 'center'
        }}>
          Data Summary
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4, // Increased gap between site boxes
          justifyContent: 'center' // Center the site boxes
        }}>
          {categories.map((site, index) => (
            <Box key={site} sx={{ 
              p: 3, 
              background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              borderRadius: '12px',
              minWidth: '220px', // Slightly increased width
              flex: '1 1 200px',
              maxWidth: '250px'
            }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                textAlign: 'center',
                mb: 2
              }}>
                {site}
              </Typography>
              {series.map((genderSeries, genderIndex) => (
                <Box key={genderSeries.name} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1.5,
                  p: 1,
                  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '6px'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                    fontWeight: 500
                  }}>
                    {genderSeries.name}:
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                    fontSize: '14px'
                  }}>
                    {genderSeries.data[index]}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mt: 2, 
                pt: 2, 
                borderTop: `2px solid ${theme.palette.mode === 'dark' ? '#444' : '#ddd'}`,
                p: 1
              }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                  fontSize: '14px'
                }}>
                  Total:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                  fontSize: '14px'
                }}>
                  {series.reduce((sum, genderSeries) => sum + genderSeries.data[index], 0)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default SiteGenderGroupedBar;