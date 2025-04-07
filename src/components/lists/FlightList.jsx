import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { 
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
  Chip,
  Box,
  Pagination
} from '@mui/material';
import { format, parseISO } from 'date-fns';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/flights?page=${currentPage}&size=5`);

        console.log(response);
  
        setFlights(response.data.content || []); 
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
  
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [currentPage]);

  const getStatusColor = (status) => {
    const statusColors = {
      'ON_TIME': 'success',
      'DELAYED': 'warning',
      'DEPARTED': 'info',
      'CANCELLED': 'error',
      'BOARDING': 'primary'
    };
    return statusColors[status] || 'default';
  };

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
    <Paper sx={{ p: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Flight Schedule
      </Typography>
      
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Flight Code</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id} hover>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>
                  {format(parseISO(flight.departureTime), 'MMM dd, HH:mm')}
                </TableCell>
                <TableCell>
                  {format(parseISO(flight.arrivalTime), 'MMM dd, HH:mm')}
                </TableCell>
                <TableCell>
                  {flight.departureAirport?.name} ({flight.departureAirport?.code})
                </TableCell>
                <TableCell>
                  {flight.arrivalAirport?.name} ({flight.arrivalAirport?.code})
                </TableCell>
                <TableCell>
                  <Chip 
                    label={flight.flightStatus} 
                    color={getStatusColor(flight.flightStatus)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={(_, page) => setCurrentPage(page - 1)} 
          color="primary"
          showFirstButton
          showLastButton
          sx={{ mt: 2 }}
        />
      </Box>
    </Paper>
  );
};

export default FlightList;
