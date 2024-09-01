import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

export const fetchPdf = async (userId: number,layoutId: number): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}cv/${layoutId}?user_id=${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      responseType: 'blob', 
    });
    console.log(response)
    if (response.status !== 200) {
      throw new Error('Failed to fetch PDF');
    }

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobURL = URL.createObjectURL(blob);
    return blobURL;
  } catch (error) {
    throw new Error('An error occurred while fetching the PDF');
  }
};

export const getLayouts = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}cv/layouts`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch layouts');
    }

    const filenames: string[] = response.data.filenames;
    const imageUrls: string[] = [];

    for (const filename of filenames) {
      const imageResponse = await axios.get(`${API_BASE_URL}cv/layout/${filename}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });

      if (imageResponse.status !== 200) {
        throw new Error(`Failed to fetch image: ${filename}`);
      }

      const blob = new Blob([imageResponse.data]);
      const imageUrl = URL.createObjectURL(blob);
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  } catch (error) {
    throw new Error('An error occurred while fetching layouts and images');
  }
};
