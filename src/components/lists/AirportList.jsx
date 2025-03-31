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
  const [airportImages, setAirportImages] = useState([]);
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

  const fetchUnsplashImage = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query: searchTerm, per_page: 1 },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
          }
        }
      );
      return response.data.results[0]?.urls?.regular || '';
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      return ''; 
    }
  };

  const handleFlightsClick = (airportId) => {
    navigate(`/airports/${airportId}/flights`);
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await Promise.all(airports.map(airport => fetchUnsplashImage(airport.city)));
      setAirportImages(images);
    };
    if (airports.length > 0) {
      fetchImages();
    }
  }, [airports]);

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
        <Button onClick={fetchAirports}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 3 }}>
      {airports.map((airport, index) => (
        <Box key={airport.id} sx={{ flex: '1 1 calc(33.333% - 16px)', maxWidth: 'calc(33.333% - 16px)' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={airportImages[index] || ''}
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
                aria-label={`Check flights for ${airport.name}`}
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
