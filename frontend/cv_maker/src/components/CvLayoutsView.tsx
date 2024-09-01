import React, { useEffect, useState } from 'react';
import { getLayouts } from '../services/api/CvService';
import { Grid, Card, CardActionArea, CardMedia, Box } from '@mui/material';

interface CvLayoutsViewProps {
  setSelectedLayoutId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CvLayoutsView: React.FC<CvLayoutsViewProps> = ({ setSelectedLayoutId }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getLayouts();
        setImageUrls(images);
      } catch (error) {
        console.error('Failed to fetch layouts:', error);
      }
    };

    fetchImages();
  }, []);

  const handleLayoutClick = (index: number) => {
    setSelectedLayoutIndex(index);
    setSelectedLayoutId(index); 
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Layouts</h2>
      <Grid container spacing={2} justifyContent="center">
        {imageUrls.map((imageUrl, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card onClick={() => handleLayoutClick(index)} sx={{ cursor: 'pointer', border: selectedLayoutIndex === index ? '2px solid #1976d2' : 'none' }}>
              <CardActionArea>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={`Layout ${index}`}
                    style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CvLayoutsView;
