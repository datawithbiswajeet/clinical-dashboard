import React from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const TestBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: theme.shape.borderRadius,
}));

const TestMUI = () => {
  return (
    <TestBox>
      <h2>✅ MUI Installation Successful!</h2>
      <Button variant="contained" color="secondary">
        Test Button
      </Button>
    </TestBox>
  );
};

export default TestMUI;