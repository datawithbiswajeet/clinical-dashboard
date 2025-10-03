import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { fetchAdherenceKPIs } from '../../API';

const AdherenceKPICards = () => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdherenceKPIs();
        console.log('KPI Data:', response.data); // Debug log
        setKpiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching adherence KPI data:", error);
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
  console.log('KPI Data Structure:', {
    active: kpiData.active,
    adherence_rate: kpiData.adherence_rate,
    dropout_rate: kpiData.dropout_rate,
    non_adherence_rate: kpiData.non_adherence_rate,
    pending_rate: kpiData.pending_rate
  });

  const kpis = [
    { 
      title: 'Active Patients', 
      value: kpiData.active?.Total_Active_Patients?.toLocaleString() || '2830', 
      icon: '👥',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Currently enrolled'
    },
    { 
      title: 'Adherence Rate', 
      // FIX: Remove the *100 multiplication
      value: kpiData.adherence_rate?.adherence_rate ? `${(kpiData.adherence_rate.adherence_rate).toFixed(2)}%` : '0%', 
      icon: '✅',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Visit completion'
    },
    { 
      title: 'Dropout Rate', 
      // FIX: Remove the *100 multiplication
      value: kpiData.dropout_rate?.dropout_rate ? `${(kpiData.dropout_rate.dropout_rate).toFixed(2)}%` : '0%', 
      icon: '📉',
      bgGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
      description: 'Patient attrition'
    },
    { 
      title: 'Non-Adherence', 
      // FIX: Remove the *100 multiplication
      value: kpiData.non_adherence_rate?.non_adherence_rate ? `${(kpiData.non_adherence_rate.non_adherence_rate).toFixed(2)}%` : '0%', 
      icon: '⚠️',
      bgGradient: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)',
      description: 'Missed + Rescheduled'
    },
    { 
      title: 'Pending Rate', 
      // FIX: Remove the *100 multiplication
      value: kpiData.pending_rate?.pending_rate ? `${(kpiData.pending_rate.pending_rate).toFixed(2)}%` : '0%', 
      icon: '⏳',
      bgGradient: 'linear-gradient(135deg, #ce93d8 0%, #ab47bc 100%)',
      description: 'Rescheduled visits'
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

export default AdherenceKPICards;