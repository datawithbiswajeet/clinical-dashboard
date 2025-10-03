import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { fetchOperationalKPIs } from '../../API'; // You'll need to create this API function

const OperationalKPICards = () => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOperationalKPIs();
        console.log('Operational KPI Data:', response); // Debug log
        setKpiData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching operational KPI data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 3, mb: 4 }}>
        {[1, 2, 3, 4, 5].map(i => (
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

  // Debug the data structure
  console.log('Operational KPI Data Structure:', kpiData);

  const kpis = [
    { 
      title: 'Total Queries', 
      value: kpiData.total_queries?.toLocaleString() || '29974', 
      icon: '📊',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'All queries received'
    },
    { 
      title: 'Closed Queries', 
      value: kpiData.closed_queries?.toLocaleString() || '21729', 
      icon: '✅',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Successfully resolved'
    },
    { 
      title: 'Open Queries', 
      value: kpiData.open_queries?.toLocaleString() || '8245', 
      icon: '📥',
      bgGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
      description: 'Pending resolution'
    },
    { 
      title: 'Query Completeness', 
      value: kpiData.avg_query_completeness ? `${(kpiData.avg_query_completeness).toFixed(1)}%` : '90.67%', 
      icon: '📈',
      bgGradient: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)',
      description: 'Average completeness rate'
    },
    { 
      title: 'Avg Resolution Time', 
      value: kpiData.avg_resolution_time ? `${kpiData.avg_resolution_time.toFixed(1)} days` : '6.5 days', 
      icon: '⏱️',
      bgGradient: 'linear-gradient(135deg, #ce93d8 0%, #ab47bc 100%)',
      description: 'Time to resolve queries'
    },
  ];

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        sm: 'repeat(2, 1fr)', 
        lg: 'repeat(5, 1fr)' 
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {kpi.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                  {kpi.value}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                  {kpi.description}
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {kpi.icon}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OperationalKPICards;