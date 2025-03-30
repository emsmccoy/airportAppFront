import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAirports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/airports');
      const data = response.data.content || response.data;
      setAirports(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Error fetching airports:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightsClick = (airportId) => {
    navigate(`/airports/${airportId}/flights`);
  };

  const getAirportImage = (airport) => {
    const searchTerm = `${airport.city}+${airport.name}`.replace(/\s+/g, '+');
    return `https://source.unsplash.com/random/800x600/?${searchTerm},airport`;
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
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 3 }}>
      {airports.map((airport) => (
        <Box key={airport.id} sx={{ flex: '1 1 calc(33.333% - 16px)', maxWidth: 'calc(33.333% - 16px)' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={getAirportImage(airport)}
              alt={`${airport.name} image`}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {airport.name} ({airport.code})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {airport.city}, {airport.country}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleFlightsClick(airport.id)}
              >
                Check Flights
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default AirportList;
