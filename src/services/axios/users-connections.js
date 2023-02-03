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

async function postNewUserData(body) {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/users/register`, body, config);
}

async function getAllActiveUsers() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/users/list`, config);
}

export {
  postNewUserData,
  getAllActiveUsers,
};
