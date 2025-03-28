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
  Box
} from '@mui/material';
import { format, parseISO } from 'date-fns';


const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both flights and airports
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const airportsResponse = await axios.get('/airports');
        const airportsData = airportsResponse.data.content || airportsResponse.data;
        setAirports(Array.isArray(airportsData) ? airportsData : [airportsData]);

        // console.log(airportsData);

        const flightsResponse = await axios.get('/flights');
        const flightsData = flightsResponse.data.content || flightsResponse.data;
        setFlights(Array.isArray(flightsData) ? flightsData : [flightsData]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const findAirport = (airportId) => {
    return airports.find(airport => airport.id === airportId) || {};
  };


  const getStatusColor = (status) => {
    switch(status) {
      case 'SCHEDULED': return 'primary';
      case 'DELAYED': return 'warning';
      case 'DEPARTED': return 'info';
      case 'ARRIVED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
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
              <TableCell>Flight #</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {flights.map((flight) => {
              
              const departureAirport = findAirport(flight.departureAirport.id);
              const arrivalAirport = findAirport(flight.arrivalAirport.id);

              // // console.log(flight.departureAirport);
              // console.log(departureAirport);
              // console.log('Current flight:', flight);
              // console.log('Departure airport ID:', flight.departureAirport.id);
              // console.log('Airports state:', airports);
              
              // const departureAirportt = airports[flight.departureAirportId] || {};
              // console.log('Resolved departure airport:', departureAirportt);

              return (
                <TableRow key={flight.id} hover>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>
                    {format(parseISO(flight.departureTime), 'MMM dd, HH:mm')}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(flight.arrivalTime), 'MMM dd, HH:mm')}
                  </TableCell>
                  <TableCell>
                    {departureAirport?.name} ({departureAirport?.code})
                  </TableCell>
                  <TableCell>
                    {arrivalAirport?.name} ({arrivalAirport?.code})
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={flight.flightStatus} 
                      color={getStatusColor(flight.flightStatus)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FlightList;
