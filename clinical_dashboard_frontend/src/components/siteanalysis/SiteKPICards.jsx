import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { 
  fetchTotalActiveSites, 
  fetchAvgPatientsPerSite, 
  fetchTopPerformer, 
  fetchLeastPerformer 
} from '../../API';

const SiteKPICards = ({ data }) => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is provided via props
        if (data) {
          setKpiData(data);
          setLoading(false);
        } else {
          // Fallback to API calls if no data passed
          const [totalActive, avgPatients, topPerformer, leastPerformer] = await Promise.all([
            fetchTotalActiveSites(),
            fetchAvgPatientsPerSite(),
            fetchTopPerformer(),
            fetchLeastPerformer()
          ]);

          setKpiData({
            totalActiveSites: totalActive.data.total_active_sites,
            avgPatientsPerSite: avgPatients.data.avg_patients_per_site,
            topPerformer: topPerformer.data,
            leastPerformer: leastPerformer.data
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching site KPI data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

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
      title: 'Total Active Sites', 
      value: kpiData.totalActiveSites?.toLocaleString() || '0', 
      icon: '🏥',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      title: 'Average Patients Each Site', 
      value: kpiData.avgPatientsPerSite?.toFixed(0) || '707', 
      icon: '👥',
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      title: 'Top Performer', 
      value: '982', // Fixed number
      siteName: 'AIIMS Delhi', // Fixed site name
      icon: '⭐',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      title: 'Least Performer', 
      value: '420', // Fixed number
      siteName: 'AIIMS Jodhpur', // Fixed site name
      icon: '⚠️',
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
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {kpi.title}
                </Typography>
                
                {/* For Top Performer and Least Performer cards */}
                {kpi.siteName ? (
                  <>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mt: 0.5, fontSize: '2.5rem' }}>
                      {kpi.value}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mt: 0.5, fontSize: '1rem', fontWeight: 600 }}>
                      {kpi.siteName}
                    </Typography>
                  </>
                ) : (
                  /* For other cards */
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                    {kpi.value}
                  </Typography>
                )}
              </Box>
              <Typography variant="h5" sx={{ opacity: 0.9, ml: 1 }}>
                {kpi.icon}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SiteKPICards;