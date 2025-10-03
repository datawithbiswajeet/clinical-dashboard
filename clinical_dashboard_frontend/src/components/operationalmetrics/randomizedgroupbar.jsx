import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchRandomizedStats } from '../../API';
import { Box, CircularProgress, Typography, useTheme, Alert, Paper } from '@mui/material';

const SiteRandomizedGroupedBar = ({ data, title = "Randomized vs Non-Randomized by Site" }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for testing - Remove this when your API works
  const mockData = [
    { s_sitename: "AIIMS Bangalore", randomized: 782, no_randomized: 505 },
    { s_sitename: "AIIMS Delhi", randomized: 1012, no_randomized: 699 },
    { s_sitename: "AIIMS Jodhpur", randomized: 460, no_randomized: 290 },
    { s_sitename: "AIIMS Patna", randomized: 774, no_randomized: 478 },
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
          const response = await fetchRandomizedStats();
          setChartData(response.data);
        }
        setLoading(false);
        */
      } catch (err) {
        console.error("Error fetching randomized stats data:", err);
        setError("Failed to load randomized statistics data");
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

    console.log('Processing randomized stats data:', chartData);

    // Get unique sites
    const sites = chartData.map(item => item.s_sitename).filter(Boolean);
    
    // Define categories for randomized vs non-randomized
    const categories = [
      { key: 'randomized', name: 'Randomized', color: '#065f46' },
      { key: 'no_randomized', name: 'Not Randomized', color: '#ef4444' }
    ];

    // Create series for each category
    const series = categories.map(category => ({
      name: category.name,
      data: sites.map(site => {
        const record = chartData.find(item => item.s_sitename === site);
        return record ? (record[category.key] || 0) : 0;
      }),
      color: category.color
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
        borderRadius: 15,
        columnWidth: '45%',
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
        text: '',
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
        left: 10
      }
    },
    colors: ['#065f46', '#ef4444'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#10b981', '#f87171'],
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
          Loading Randomized Statistics...
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
            mt: 1
          }}
        >
          Preparing site-wise randomization data
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
          No randomized statistics data available. Please check your data source.
          <br />
          <strong>Data structure expected:</strong>
          <br />
          s_sitename, randomized, no_randomized fields
        </Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ 
      width: '100%',
      maxWidth: '1500px',
      p: 5,
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
        px: 1
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
        mx: 2
      }}>
        <Typography variant="h6" sx={{ 
          mb: 3, 
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f', 
          fontWeight: 600,
          textAlign: 'center'
        }}>
          Randomization Summary
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          justifyContent: 'center'
        }}>
          {categories.map((site, index) => {
            const randomized = series[0].data[index];
            const notRandomized = series[1].data[index];
            const total = randomized + notRandomized;
            const randomizedPercentage = total > 0 ? ((randomized / total) * 100).toFixed(1) : 0;

            return (
              <Box key={site} sx={{ 
                p: 3, 
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                borderRadius: '12px',
                minWidth: '220px',
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
                
                {/* Randomized */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1.5,
                  p: 1,
                  background: 'rgba(6, 95, 70, 0.1)',
                  borderRadius: '6px'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#065f46',
                    fontWeight: 500
                  }}>
                    Randomized:
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 700, 
                    color: '#065f46',
                    fontSize: '14px'
                  }}>
                    {randomized}
                  </Typography>
                </Box>

                {/* Not Randomized */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1.5,
                  p: 1,
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '6px'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#ef4444',
                    fontWeight: 500
                  }}>
                    Not Randomized:
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 700, 
                    color: '#ef4444',
                    fontSize: '14px'
                  }}>
                    {notRandomized}
                  </Typography>
                </Box>

                {/* Percentage */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '6px'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                    fontWeight: 500
                  }}>
                    Randomized %:
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e3a2f',
                    fontSize: '14px'
                  }}>
                    {randomizedPercentage}%
                  </Typography>
                </Box>

                {/* Total */}
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
                    {total}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default SiteRandomizedGroupedBar;