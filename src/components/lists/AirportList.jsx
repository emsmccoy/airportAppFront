import React, { useState, useEffect } from 'react';
import axios from '../../services/api'; 
import { 
  Paper, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  CircularProgress,
  Alert 
} from '@mui/material';

const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/airports");
      
      // Handle the nested response structure
      const responseData = response.data.content;
      
      // Ensure we're working with an array
      const data = Array.isArray(responseData) 
        ? responseData 
        : [responseData];
        
      setAirports(data);
    } catch (error) {
      console.error('Error fetching airports:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Airports List
        </Typography>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="airports table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {airports.length > 0 ? (
                airports.map((airport) => (
                  <TableRow key={airport.id} hover>
                    <TableCell>{airport.name}</TableCell>
                    <TableCell>{airport.code}</TableCell>
                    <TableCell>{airport.city}</TableCell>
                    <TableCell>{airport.country}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Alert severity="info">No airports found</Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
};

export default AirportList;
