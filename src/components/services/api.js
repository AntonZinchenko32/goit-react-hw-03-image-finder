// services/api.js
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

export const getAllImages = async (userInput, page) => {
  const params = new URLSearchParams({
    key: '34183438-5ac415132938cde4893c052fd',
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
    page: page,
  });

  const { data } = await axios(`api/?${params}`);
  return data;
};

