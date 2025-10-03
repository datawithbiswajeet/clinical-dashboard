import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { fetchKPIs } from '../API';

const KPICards = () => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKPIs()
      .then(response => {
        setKpiData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching KPI data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <Card key={i} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <LinearProgress />
              <Typography variant="h6" sx={{ mt: 1 }}>Loading...</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (!kpiData) return null;

  const kpis = [
    { 
      title: 'Total Patients', 
      value: kpiData.total_unique_patients?.toLocaleString() || '0', 
      change: '+12%', 
      trend: 'up',
      icon: '👥',
      color: 'primary.main',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      title: 'Total Visits', 
      value: kpiData.total_visits?.toLocaleString() || '0', 
      change: '+8%', 
      trend: 'up',
      icon: '📊',
      color: 'secondary.main',
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      title: 'Completion Rate', 
      value: `${kpiData.visit_completion_pct || 0}%`, 
      change: '+3.2%', 
      trend: 'up',
      icon: '✅',
      color: 'success.main',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      title: 'Missed Visits', 
      value: kpiData.visit_missed?.toLocaleString() || '0', 
      change: '-2.1%', 
      trend: 'down',
      icon: '⏰',
      color: 'error.main',
      bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
  ];

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        md: 'repeat(2, 1fr)', 
        lg: 'repeat(4, 1fr)' 
      }, 
      gap: 3, 
      mb: 4 
    }}>
      {kpis.map((kpi, index) => (
        <Card 
          key={index} 
          sx={{ 
            borderRadius: 2,
            background: kpi.bgGradient,
            color: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3)'
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {kpi.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                  {kpi.value}
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {kpi.icon}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {kpi.trend === 'up' ? (
                <TrendingUp sx={{ fontSize: 18, mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ fontSize: 18, mr: 0.5 }} />
              )}
              <Typography variant="body2" sx={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {kpi.change}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.875rem', opacity: 0.7, ml: 1 }}>
                from last week
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default KPICards;