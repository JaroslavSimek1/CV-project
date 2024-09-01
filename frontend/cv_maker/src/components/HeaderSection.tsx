import React from 'react';
import { Typography, Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderSectionProps {
  isLoggedIn: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ isLoggedIn }) => {
  return (
      <Container maxWidth="lg" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to the CV Making App
        </Typography>
        <Typography variant="body1" align="center" paragraph style={{ fontSize: '1.2rem' }}>
          Create and manage your CV with ease.
        </Typography>
        <Typography variant="body1" align="center" paragraph style={{ fontSize: '1.2rem' }}>
          Input your personal information, education, work experience, skills, and more.
        </Typography>
        <Grid container justifyContent="center" spacing={2} style={{ marginTop: '3rem' }}>
          <Grid item>
            {isLoggedIn ? (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/cv"
                style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              >
                Create CV
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/auth"
                style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              >
                Create CV
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
  );
};

export default HeaderSection;
