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

async function adminSignIn(body) {
  return axios.post(`${BASE_URL}/auth/admin/signin`, body);
}

async function postNewUserData(body) {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/auth/admin/register`, body, config);
}

async function postRatings(body) {
  const config = generateHeaders();
  return axios.post(`${BASE_URL}/ratings`, body, config);
}

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

async function getAllPreparingOrders() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/chart`, config);
}

async function updateOrderStatus(id) {
  const config = generateHeaders();
  return axios.patch(`${BASE_URL}/chart/${id}`, {}, config);
}

async function getAllRatings() {
  const config = generateHeaders();
  return axios.get(`${BASE_URL}/ratings`, config);
}

export {
  getCategories,
  getCategoryProducts,
  getProductData,
  signIn,
  validateToken,
  postRatings,
  postOrder,
  listAllOrders,
  finishOrderAndUpdateStatus,
  listAllFinishedOrders,
  deleteActiveOrder,
  postPayment,
  postWaiterCall,
  deleteWaiterCall,
  getThisUserCall,
  getAllUserCall,
  getAllPreparingOrders,
  updateOrderStatus,
  getAllRatings,
  adminSignIn,
  postNewUserData
};
