import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchGaugeData } from '../API';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const EnrollmentGauge = () => {
  const theme = useTheme();
  const [gaugeData, setGaugeData] = useState({ total_enrolled: 0, total_target: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaugeData()
      .then(response => {
        setGaugeData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching gauge data:", error);
        setLoading(false);
      });
  }, []);

  const percent = gaugeData.total_target > 0 ? 
    (gaugeData.total_enrolled / gaugeData.total_target) * 100 : 0;

  // Your beautiful color palette
  const colors = ['#065f46', '#fee440', '#00bbf9', '#059669', '#f15bb5'];
  
  // Determine gauge color based on percentage using YOUR colors
  const getGaugeColor = () => {
    if (percent >= 90) return colors[4]; // Pink (f15bb5)
    if (percent >= 75) return colors[2]; // Blue (00bbf9)
    if (percent >= 50) return colors[3]; // Green (059669)
    return colors[1]; // Yellow (fee440)
  };

  const gaugeColor = getGaugeColor();

  // Full circle gauge chart options - HIDE the built-in percentage
  const chartOptions = {
    chart: {
      type: 'radialBar',
      height: 280,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '75%',
          background: 'transparent',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 8,
            opacity: 0.24
          }
        },
        track: {
          background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          strokeWidth: '100%',
          margin: 0,
        },
        dataLabels: {
          show: false, // HIDE all data labels from the chart itself
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientFrom: gaugeColor,
        gradientTo: gaugeColor,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round',
      dashArray: 0
    },
    labels: ['Completion'],
    colors: [gaugeColor],
  };

  const chartSeries = [Math.round(percent)];

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
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#10b981',
            filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))'
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
      height: '400px',
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
          radial-gradient(circle at 20% 80%, rgba(6,95,70,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(241,91,181,0.03) 0%, transparent 50%)
        `,
        animation: 'pulse 6s ease-in-out infinite alternate',
        zIndex: 0
      }} />

      {/* Main Content */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Gauge Chart Container */}
        <Box sx={{ 
          flex: 1,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Main Gauge */}
          <Box sx={{
            position: 'relative',
            width: '260px',
            height: '260px'
          }}>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="radialBar"
              height={260}
              width={260}
            />
            
            {/* Center Content Overlay - Only one percentage display */}
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <Typography 
                variant="h2" 
                fontWeight="bold"
                sx={{ 
                  color: theme.palette.text.primary,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  lineHeight: 1,
                  mb: 0.5
                }}
              >
                {Math.round(percent)}%
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  opacity: 0.8,
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                Complete
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Footer */}
        <Box sx={{ 
          mt: 'auto',
          p: 2,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Progress Numbers */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#059669' }}>
                {gaugeData.total_enrolled.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="500">
                Enrolled
              </Typography>
            </Box>
            
            <Box sx={{ 
              mx: 1,
              color: 'text.secondary',
              opacity: 0.6
            }}>
              <Typography variant="h6">/</Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#065f46' }}>
                {gaugeData.total_target.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="500">
                Target
              </Typography>
            </Box>
          </Box>

          {/* Mini Progress Bar */}
          <Box sx={{ 
            position: 'relative',
            height: '6px', 
            background: 'rgba(0, 0, 0, 0.1)', 
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute',
              height: '100%',
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${gaugeColor}80, ${gaugeColor})`,
              borderRadius: '3px',
              transition: 'width 1s ease-in-out',
              boxShadow: `0 0 12px ${gaugeColor}80`
            }} />
            
            {/* Progress dots */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 0.5
            }}>
              {[0, 25, 50, 75, 100].map((mark) => (
                <Box
                  key={mark}
                  sx={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: percent >= mark ? 'white' : 'rgba(0,0,0,0.3)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Progress Labels */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 0.5
          }}>
            {[0, 25, 50, 75, 100].map((mark) => (
              <Typography 
                key={mark} 
                variant="caption" 
                sx={{ 
                  color: percent >= mark ? gaugeColor : 'text.secondary',
                  fontWeight: percent >= mark ? 600 : 400,
                  fontSize: '10px'
                }}
              >
                {mark}%
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.02); }
            100% { opacity: 0.4; transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default EnrollmentGauge;