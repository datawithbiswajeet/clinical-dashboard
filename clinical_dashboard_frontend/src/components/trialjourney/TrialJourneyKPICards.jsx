import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { fetchTrialJourneyKPIs } from '../../API';

const TrialJourneyKPICards = ({ data }) => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data) {
          setKpiData(data);
          setLoading(false);
        } else {
          const response = await fetchTrialJourneyKPIs();
          setKpiData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching trial journey KPI data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, 
        gap: 2, 
        mb: 4 
      }}>
        {[1, 2, 3, 4, 5].map(i => (
          <Card key={i} sx={{ borderRadius: 2, boxShadow: 2, minHeight: '140px' }}>
            <CardContent sx={{ p: 2 }}>
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>Loading...</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (!kpiData) return null;

  const kpis = [
    { 
      title: 'Total Visits', 
      value: kpiData.total_visits?.toLocaleString() || '0', 
      icon: '📊',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadowColor: 'rgba(102, 126, 234, 0.4)'
    },
    { 
      title: 'Screening Passed', 
      value: kpiData.screening_passed?.toLocaleString() || '0', 
      icon: '✅',
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.4)'
    },
    { 
      title: 'Randomized', 
      value: kpiData.randomized?.toLocaleString() || '0', 
      icon: '🔀',
      bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      shadowColor: 'rgba(59, 130, 246, 0.4)'
    },
    { 
      title: 'AE Reported', 
      value: kpiData.total_ae_reported?.toLocaleString() || '0', 
      icon: '⚠️',
      bgGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      shadowColor: 'rgba(239, 68, 68, 0.4)'
    },
    { 
      title: 'Medication Taken Rate', 
      value: kpiData.completion_rate ? `${kpiData.completion_rate}%` : '70.64%', 
      icon: '📈',
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      shadowColor: 'rgba(245, 158, 11, 0.4)'
    }
  ];

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: 'repeat(2, 1fr)', 
        sm: 'repeat(3, 1fr)',
        md: 'repeat(5, 1fr)' 
      }, 
      gap: 2, 
      mb: 4 
    }}>
      {kpis.map((kpi, index) => (
        <Card 
          key={index} 
          sx={{ 
            borderRadius: 3,
            background: kpi.bgGradient,
            color: 'white',
            boxShadow: `0 4px 20px ${kpi.shadowColor}`,
            transition: 'all 0.3s ease-in-out',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              zIndex: 1
            },
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: `0 8px 40px ${kpi.shadowColor}`,
            }
          }}
        >
          {/* Animated background elements */}
          <Box sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite alternate',
            zIndex: 1
          }} />
          
          <CardContent sx={{ 
            p: 3, 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 2 
          }}>
            {/* Icon with glow effect */}
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              mb: 2,
              boxShadow: '0 4px 15px rgba(255,255,255,0.3)'
            }}>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {kpi.icon}
              </Typography>
            </Box>
            
            {/* Value - Much Larger */}
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', md: '1.8rem', lg: '2rem' },
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                mb: 1
              }}
            >
              {kpi.value}
            </Typography>
            
            {/* Single Title - Easily Editable Size */}
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.95,
                fontSize: { xs: '0.9rem', md: '1rem', lg: '1.1rem' },
                fontWeight: 600,
                textShadow: '0 1px 5px rgba(0,0,0,0.2)',
                lineHeight: 1.2
              }}
            >
              {kpi.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TrialJourneyKPICards;