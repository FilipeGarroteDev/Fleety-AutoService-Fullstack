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

async function finishOrderAndUpdateStatus(body) {
  const config = generateHeaders();
  return axios.patch(`${BASE_URL}/checkout`, body, config);
}

async function listAllFinishedOrders(ticketId) {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/checkout/${ticketId}`, config);
}

async function postPayment(body, ticketId) {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/checkout/payment/${ticketId}`, body, config);
}

export {
  finishOrderAndUpdateStatus,
  listAllFinishedOrders,
  postPayment,
};
