import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { authContext } from '../../Context/AuthContext'; // Import your authContext

const ImageComponent = (image_url) => {
  const [imageUrl, setImageUrl] = useState('');
  const { token } = useContext(authContext);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    axios.get(image_url, {
      responseType: 'blob',
    })
      .then(response => {
        const objectURL = URL.createObjectURL(response.data);
        setImageUrl(objectURL);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    imageUrl
  );
};

export default ImageComponent;