import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import EnrollmentGauge from './EnrollmentGauge';
import VisitStatusDonut from './VisitStatusDonut';
import EnrollmentTrend from './EnrollmentTrend';

const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2), // ✅ CHANGED: 2.5 → 2
  borderRadius: 16,
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.18)',
    background: 'rgba(255, 255, 255, 0.95)'
  }
}));

const ChartsSection = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {/* Enrollment Progress */}
        <Grid item xs={12} md={6}>
          <ChartPaper>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              textAlign: 'center', 
              mb: 1 // ✅ CHANGED: 2 → 1
            }}>
              📈 Enrollment Progress
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EnrollmentGauge />
            </Box>
          </ChartPaper>
        </Grid>

        {/* Visit Status Distribution */}
        <Grid item xs={12} md={4}>
          <ChartPaper>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              textAlign: 'center', 
              mb: 1 // ✅ CHANGED: 2 → 1
            }}>
              🎯 Visit Status
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <VisitStatusDonut />
            </Box>
          </ChartPaper>
        </Grid>

        {/* Monthly Enrollment Trend */}
        <Grid item xs={12} md={4}>
          <ChartPaper>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              textAlign: 'center', 
              mb: 1 // ✅ CHANGED: 2 → 1
            }}>
              📅 Monthly Trend
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EnrollmentTrend />
            </Box>
          </ChartPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChartsSection;