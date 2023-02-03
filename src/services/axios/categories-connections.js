import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const generateHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

async function getCategories(productType) {
  return axios.get(`${BASE_URL}/categories/${productType}`);
}

export {
  getCategories,
};
