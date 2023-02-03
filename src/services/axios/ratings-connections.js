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

async function postRatings(body) {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/ratings`, body, config);
}

async function getAllRatings() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/ratings`, config);
}

export {
  postRatings,
  getAllRatings,
};
