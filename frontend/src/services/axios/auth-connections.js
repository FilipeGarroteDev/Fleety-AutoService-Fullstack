import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function validateToken(token) {
  return axios.get(`${BASE_URL}/auth/validate`, { headers: { Authorization: `Bearer ${token}` } });
}

async function signIn(body) {
  return axios.post(`${BASE_URL}/auth/signin`, body);
}

async function adminSignIn(body) {
  return axios.post(`${BASE_URL}/auth/admin/signin`, body);
}

export {
  signIn,
  validateToken,
  adminSignIn,
};
