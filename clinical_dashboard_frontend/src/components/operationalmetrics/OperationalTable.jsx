// components/operationalmetrics/OperationalTable.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { fetchComprehensiveTable } from '../../API';

const OperationalTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchComprehensiveTable();
        setTableData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching comprehensive table data:", err);
        setError("Failed to load comprehensive table data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ 
        fontWeight: 'bold', 
        color: '#1e3a8a',
        mb: 3,
        textAlign: 'center'
      }}>
        Comprehensive Site Performance Overview
      </Typography>
      
      <TableContainer component={Paper} elevation={0} sx={{ 
        background: 'transparent',
        maxHeight: '600px'
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)' }}>Site Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)' }}>Randomized</TableCell>
              <TableCell sx={{ fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)' }}>Not Randomized</TableCell>
              <TableCell sx={{ fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)' }}>Medication Take %</TableCell>
              <TableCell sx={{ fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)' }}>Query Completeness</TableCell>
              <TableCell sx={{ fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)' }}>Timeliness</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} sx={{ 
                '&:nth-of-type(odd)': { background: 'rgba(0,0,0,0.02)' },
                '&:hover': { background: 'rgba(59, 130, 246, 0.05)' }
              }}>
                <TableCell sx={{ fontWeight: '600' }}>{row.s_sitename}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.randomized || 0} 
                    size="small" 
                    color="success" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.no_randomized || 0} 
                    size="small" 
                    color="error" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${(row.avg_medication_take_percent || 0).toFixed(1)}%`} 
                    size="small" 
                    color="primary" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${(row.avg_querycompleteness || 0).toFixed(1)}%`} 
                    size="small" 
                    color="secondary" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${(row.avg_timeliness || 0).toFixed(1)}%`} 
                    size="small" 
                    color="warning" 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OperationalTable;