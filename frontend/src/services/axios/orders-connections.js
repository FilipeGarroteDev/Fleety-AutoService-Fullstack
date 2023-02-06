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

async function postOrder(body) {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/chart/add`, body, config);
}

async function listAllOrders(ticketId) {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/chart/${ticketId}`, config);
}

async function deleteActiveOrder(orderId) {
  const config = generateHeaders();
  return axios.delete(`${BASE_URL}/chart/${orderId}`, config);
}

async function getAllPreparingOrders() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/chart`, config);
}

async function updateOrderStatus(id) {
  const config = generateHeaders();
  return axios.patch(`${BASE_URL}/chart/${id}`, {}, config);
}

export {
  postOrder,
  listAllOrders,
  deleteActiveOrder,
  getAllPreparingOrders,
  updateOrderStatus,
};
