import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import { fetchPdf } from '../services/api/CvService';

interface PdfViewerProps {
  layoutId: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ layoutId }) => {
  const [pdfURL, setPdfURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPdf = async () => {
    setLoading(true);
    const userId = Number(localStorage.getItem('userId'));
    try {
      const pdfBlobURL = await fetchPdf(userId, layoutId); 
      setPdfURL(pdfBlobURL);
    } catch (error) {
      setError('Failed to load PDF');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPdf();
  }, [layoutId]);

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && pdfURL && (
        <div>
          <iframe src={pdfURL} title="PDF Viewer" width="100%" height="1123px" />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
