import React, { useEffect, useState } from 'react';
import { getLayouts } from '../services/api/CvService';
import { Grid, Card, CardMedia, Modal, Fade } from '@mui/material';
interface LayoutsExamplesProps {}

const LayoutsExamples: React.FC<LayoutsExamplesProps> = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImageUrl(null);
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative',}}>
      <h1>
        Explore our layout examples below:
      </h1>
      <Grid container spacing={2} justifyContent="center">
        {imageUrls.map((imageUrl, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => handleImageClick(imageUrl)}
            >
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt={`Layout ${index}`}
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={selectedImageUrl !== null}
        onClose={handleCloseModal}
        closeAfterTransition
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Fade in={selectedImageUrl !== null}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30vw',
          }}>
            {selectedImageUrl && (
              <img src={selectedImageUrl} alt="Selected Layout" style={{ width: '100%', height: 'auto' }} />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default LayoutsExamples;
