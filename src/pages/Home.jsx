import React from "react";
import { Paper, Box, Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Airport App
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage airports, flights, and planes efficiently with our application. Navigate through the menu to get started!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
