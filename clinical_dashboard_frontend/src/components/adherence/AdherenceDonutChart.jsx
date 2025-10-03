import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchAdherenceCategories } from '../../API';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const AdherenceDonutChart = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdherenceCategories()
      .then(response => {
        setChartData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching adherence categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <CircularProgress sx={{ color: '#8b5cf6' }} />
      </Box>
    );
  }

  const options = {
    chart: { type: 'donut', height: 350 },
    labels: chartData.map(item => item.adherence_category),
    colors: ['#10b981', '#f59e0b', '#ef4444'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: true }
  };

  const series = chartData.map(item => item.patient_count);

  return (
    <Box sx={{ width: '100%' }}>
      <Chart options={options} series={series} type="donut" height={350} />
    </Box>
  );
};

export default AdherenceDonutChart;