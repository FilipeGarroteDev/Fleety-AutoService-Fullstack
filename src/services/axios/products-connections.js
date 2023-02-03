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

async function getCategoryProducts(categoryId) {
  return axios.get(`${BASE_URL}/products/category/${categoryId}`);
}

async function getProductData(productId) {
  return axios.get(`${BASE_URL}/products/${productId}`);
}

export {
  getCategoryProducts,
  getProductData,
};
