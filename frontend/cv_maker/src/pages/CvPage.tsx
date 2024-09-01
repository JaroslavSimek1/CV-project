import React, { useState } from 'react';
import PdfViewer from '../components/PdfViewer';
import CvLayoutsView from '../components/CvLayoutsView';
import ProfileForm from '../components/ProfileForm';
import { Grid, Container, Button, Box } from '@mui/material';


const CvPage: React.FC = () => {
  const [selectedLayoutId, setSelectedLayoutId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Container style={{ paddingBottom: '75px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box textAlign="center">
                {currentPage === 1 && (
                  <ProfileForm />
                )}
                {currentPage === 2 && (
                  <CvLayoutsView setSelectedLayoutId={setSelectedLayoutId} />
                )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center">
              {currentPage === 2 && (
                <PdfViewer layoutId={selectedLayoutId || 0} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
        <Box
        textAlign="center"
        position="fixed"
        bottom="80px"
        left="95%"
        marginLeft="-80px" 
        zIndex="1000"
        width="160px" 
      >
        {currentPage === 1 && (
          <Button variant="contained" onClick={handleNextPage} style={{ borderRadius: '50%', width: '80px', height: '80px', fontWeight: 'bold' }}>
            Next
          </Button>
        )}
        {currentPage === 2 && (
          <Button variant="contained" onClick={handlePreviousPage} style={{ borderRadius: '50%', width: '80px', height: '80px', fontWeight: 'bold' }}>
            Previous
          </Button>
        )}
      </Box>
    </>
  );
};

export default CvPage;
