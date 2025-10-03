import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Box, Typography, Chip, CircularProgress,
  TextField, MenuItem, IconButton, InputAdornment, Tooltip,
  Button
} from '@mui/material';
import { 
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { fetchPatientDetails } from '../../API';

const PatientAdherenceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    siteName: '',
    adherenceCategory: '',
    searchTerm: ''
  });

  // Hardcoded filter options
  const [filterOptions, setFilterOptions] = useState({
    sites: [
      'AIIMS Delhi',
      'AIIMS Bangalore', 
      'AIIMS Jodhpur',
      'AIIMS Patna'
    ],
    categories: ['High', 'Medium', 'Low']
  });

  // Fetch data with filters and pagination
  const fetchData = async (pageNum, pageSize, filterParams = {}) => {
    try {
      setLoading(true);
      const response = await fetchPatientDetails(pageNum, pageSize, filterParams);
      console.log('Patient Details Data:', response.data);
      setData(response.data.data);
      setTotalRows(response.data.total_rows); // Make sure your API returns total_rows
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      setLoading(false);
    }
  };

  // Fetch data when page or rowsPerPage changes
  useEffect(() => {
    fetchData(page + 1, rowsPerPage, filters);
  }, [page, rowsPerPage]);

  // Apply filters - this should trigger a new API call
  const applyFilters = () => {
    setPage(0); // Reset to first page when filters change
    fetchData(1, rowsPerPage, filters);
  };

  // Debounced filter application
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [filters.siteName, filters.adherenceCategory]);

  // Immediate search filter
  useEffect(() => {
    if (filters.searchTerm === '' || filters.searchTerm.length >= 3) {
      applyFilters();
    }
  }, [filters.searchTerm]);

  const handleFilterChange = (filterName, value) => {
    console.log(`Filter changed: ${filterName} = ${value}`);
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      siteName: '',
      adherenceCategory: '',
      searchTerm: ''
    });
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      'Active': { color: 'success', icon: '🟢' },
      'Dropout': { color: 'error', icon: '🔴' },
      'Completed': { color: 'primary', icon: '✅' }
    };
    
    const config = statusConfig[status] || { color: 'default', icon: '⚪' };
    
    return (
      <Chip
        icon={<span>{config.icon}</span>}
        label={status}
        color={config.color}
        size="small"
        variant="outlined"
        sx={{ fontWeight: 'bold' }}
      />
    );
  };

  const getAdherenceChip = (category) => {
    const categoryConfig = {
      'High': { bgColor: '#10b981', emoji: '🎯' },
      'Medium': { bgColor: '#f59e0b', emoji: '📊' },
      'Low': { bgColor: '#ef4444', emoji: '⚠️' }
    };
    
    const config = categoryConfig[category] || { bgColor: '#6b7280', emoji: '❓' };
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          label={category || 'Unknown'}
          size="small"
          sx={{
            backgroundColor: config.bgColor,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.75rem',
            minWidth: 80
          }}
        />
        <span>{config.emoji}</span>
      </Box>
    );
  };

  const hasActiveFilters = filters.siteName || filters.adherenceCategory || filters.searchTerm;

  if (loading && data.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress sx={{ color: '#8b5cf6' }} />
      </Box>
    );
  }

  return (
    <Paper 
      sx={{ 
        borderRadius: 2,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden'
      }}
    >
      {/* Filter Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(139, 92, 246, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon sx={{ color: '#8b5cf6' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e3a2f' }}>
            Filters
          </Typography>
        </Box>

        {/* Search Filter */}
        <TextField
          size="small"
          placeholder="Search Patient ID or Site..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200 }}
        />

        {/* Site Filter */}
        <TextField
          select
          size="small"
          label="Site"
          value={filters.siteName}
          onChange={(e) => handleFilterChange('siteName', e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Sites</MenuItem>
          {filterOptions.sites.map(site => (
            <MenuItem key={site} value={site}>{site}</MenuItem>
          ))}
        </TextField>

        {/* Category Filter */}
        <TextField
          select
          size="small"
          label="Adherence Category"
          value={filters.adherenceCategory}
          onChange={(e) => handleFilterChange('adherenceCategory', e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {filterOptions.categories.map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </TextField>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Tooltip title="Clear all filters">
            <IconButton 
              onClick={clearFilters}
              sx={{ 
                color: '#ef4444',
                '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* Results Count */}
        <Typography variant="body2" sx={{ ml: 'auto', color: '#6b7280' }}>
          Showing {data.length} of {totalRows} patients
          {hasActiveFilters && ' (filtered)'}
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 120 }}>Patient ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 100 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 120 }}>Adherence Rate</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 150 }}>Adherence Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 150 }}>Site Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 100 }}>Total Visits</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 120 }}>Completed Visits</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 100 }}>Missed Visits</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1e3a2f', minWidth: 130 }}>Rescheduled Visits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    {hasActiveFilters ? 'No patients match the current filters' : 'No patient data available'}
                  </Typography>
                  {hasActiveFilters && (
                    <Button 
                      onClick={clearFilters}
                      variant="outlined" 
                      sx={{ mt: 1 }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow 
                  key={row.patientpk || index}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 92, 246, 0.05)',
                      transition: 'all 0.2s ease'
                    },
                    '&:nth-of-type(even)': { 
                      backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                    }
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>
                      {row.patientpk || 'N/A'}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    {getStatusChip(row.status || 'Active')}
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ 
                      textAlign: 'center', 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      borderRadius: '8px', 
                      p: 0.5 
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1e3a2f' }}>
                        {row.adherence_rate ? `${(row.adherence_rate).toFixed(1)}%` : 'N/A'}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    {getAdherenceChip(row.adherence_category)}
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {row.s_sitename || 'N/A'}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ 
                      textAlign: 'center', 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      borderRadius: '8px', 
                      p: 0.5 
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {row.total_visits || 0}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ 
                      textAlign: 'center', 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      borderRadius: '8px', 
                      p: 0.5 
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                        {row.completed_visits || 0}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ 
                      textAlign: 'center', 
                      background: 'rgba(239, 68, 68, 0.1)', 
                      borderRadius: '8px', 
                      p: 0.5 
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ef4444' }}>
                        {row.missed_visits || 0}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ 
                      textAlign: 'center', 
                      background: 'rgba(245, 158, 11, 0.1)', 
                      borderRadius: '8px', 
                      p: 0.5 
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
                        {row.rescheduled_visits || 0}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalRows} // Use totalRows instead of filteredData.length
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(139, 92, 246, 0.05)'
        }}
      />
    </Paper>
  );
};

export default PatientAdherenceTable;