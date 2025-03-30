import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import { format, parseISO } from 'date-fns';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Chip
} from '@mui/material';

const AirportFlightList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airport, setAirport] = useState(null);
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [airportRes, departuresRes, arrivalsRes] = await Promise.all([
          axios.get(`/airports/${id}`),
          axios.get(`/airports/${id}/departures`),
          axios.get(`/airports/${id}/arrivals`)
        ]);

        setAirport(airportRes.data);
        setDepartures(departuresRes.data);
        setArrivals(arrivalsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      SCHEDULED: 'primary',
      DELAYED: 'warning',
      DEPARTED: 'info',
      ARRIVED: 'success',
      CANCELLED: 'error'
    };
    return colors[status] || 'default';
  };

  const formatDateTime = (dateTimeString) => {
    return format(parseISO(dateTimeString), 'MMM dd, yyyy HH:mm');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {airport?.name} ({airport?.code})
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {airport?.city}, {airport?.country}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mt: 3 }}>
        {/* Departures Table */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ p: 2 }}>Departures</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Flight</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Departure</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departures.map((flight) => (
                <TableRow key={flight.id} hover>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>{flight.arrivalAirport?.code}</TableCell>
                  <TableCell>{formatDateTime(flight.departureTime)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={flight.flightStatus} 
                      color={getStatusColor(flight.flightStatus)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {departures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">No departures scheduled</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Arrivals Table */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ p: 2 }}>Arrivals</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Flight</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Arrival</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrivals.map((flight) => (
                <TableRow key={flight.id} hover>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>{flight.departureAirport?.code}</TableCell>
                  <TableCell>{formatDateTime(flight.arrivalTime)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={flight.flightStatus} 
                      color={getStatusColor(flight.flightStatus)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {arrivals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">No arrivals scheduled</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AirportFlightList;
