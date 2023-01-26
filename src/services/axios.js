import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function getCategories(productType) {
  return axios.get(`${BASE_URL}/menu/${productType}`);
}

export { getCategories };
