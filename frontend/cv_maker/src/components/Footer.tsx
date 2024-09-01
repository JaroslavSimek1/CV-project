import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, useTheme, Container, Grid, Link as MuiLink } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  return (
    <footer style={{ backgroundColor: theme.palette.primary.main, color: 'white', padding: '1rem'}}>
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography>
              <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', marginRight: '2rem' }}>About Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Typography>
              <MuiLink href="mailto:simek.jara353@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                contact:simek.jara353@gmail.com
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
