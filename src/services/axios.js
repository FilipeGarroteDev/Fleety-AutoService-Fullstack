import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function validateToken(token) {
  return axios.get(`${BASE_URL}/auth/validate`, { headers: { Authorization: `Bearer ${token}` } });
}

async function getCategories(productType) {
  return axios.get(`${BASE_URL}/categories/${productType}`);
}

async function getCategoryProducts(categoryId) {
  return axios.get(`${BASE_URL}/products/category/${categoryId}`);
}

async function getProductData(productId) {
  return axios.get(`${BASE_URL}/products/${productId}`);
}

async function signIn(body) {
  return axios.post(`${BASE_URL}/auth/signin`, body);
}

export { getCategories, getCategoryProducts, getProductData, signIn, validateToken };
