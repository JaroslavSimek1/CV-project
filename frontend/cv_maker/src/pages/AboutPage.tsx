import React, { useEffect } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '10rem', height:'100vh'}}>
      <div className="diagonal-line"></div>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h1" align="center" gutterBottom>
              About Us
            </Typography>
          </motion.div>
        </Grid>
        <Grid item>
            <Typography variant="h5" align="center" paragraph>
              Welcome to CV Maker! We are dedicated to providing you with the best tools for creating professional CVs.
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Our mission is to help individuals showcase their skills and experience effectively to potential employers.
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Feel free to explore our website and create your perfect CV today!
            </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
