import React, { useState, useEffect } from 'react';
import axios from '../../services/api'; 
import { 
  Paper, 
  Box, 
  Button, 
  Card, 
  CardContent, 
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
      
      // Ensure we're working with an array
      const data = Array.isArray(response.data) 
        ? response.data 
        : [response.data];
        
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

  console.log('Rendered airports:', airports);

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
    <Paper sx={{ padding: 2 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        {airports.length > 0 ? (
          airports.map((airport) => (
            <Box
              key={airport.id}
              gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {airport.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Code: {airport.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    City: {airport.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Country: {airport.country}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <Box gridColumn="span 12">
            <Alert severity="info">No airports found</Alert>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AirportList;
