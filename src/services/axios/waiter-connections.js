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

async function postWaiterCall() {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/waiter`, {}, config);
}

async function deleteWaiterCall(userId) {
  const config = generateHeaders();
  return axios.delete(`${BASE_URL}/waiter/${userId}`, config);
}

async function getThisUserCall() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/waiter/mycall`, config);
}

async function getAllUserCall() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/waiter/calls`, config);
}

export {
  //waiter
  postWaiterCall,
  deleteWaiterCall,
  getThisUserCall,
  getAllUserCall,
};
