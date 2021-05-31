import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const headerWithAuthorization = () => {
  return {
    authorization: `Bearer ${localStorage.getItem('apiKey')}`,
  };
};

const signupRequest = async (data) => {
  const dataUser = { ...data };
  dataUser.user_type = 0;
  const response = await axiosInstance({
    method: 'POST',
    url: '/api/users/future/signup',
    data: dataUser,
  });
  return { response: response.data, status: response.status };
};

const loginRequest = async (data) => {
  const response = await axiosInstance({
    method: 'POST',
    url: 'api/users/future/login',
    data,
  });
  return { response: response.data, status: response.status };
};

const createPropertyRequest = async (data, id) => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'POST',
    url: `api/properties/create/${id}`,
    data,
  });
  return { response: response.data, status: response.status };
};

const deletePropertyRequest = async (id) => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'DELETE',
    url: `api/properties/delete/${id}`,
  });
  return { response: response.data, status: response.status };
};

const getPropertiesRequest = async () => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'GET',
    url: `api/properties`,
  });
  return { response: response.data, status: response.status };
};

const createAppointmentRequest = async (data) => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'POST',
    url: `api/appointments/future/create`,
    data,
  });
  return { response: response.data, status: response.status };
};

const getAppointmentsRequest = async () => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'GET',
    url: `api/appointments`,
  });
  return { response: response.data, status: response.status };
};

const getUserRequest = async (id) => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'GET',
    url: `api/users/${id}`,
  });
  return { response: response.data, status: response.status };
};

const getUsersRequest = async () => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'GET',
    url: `api/users`,
  });
  return { response: response.data, status: response.status };
};

const updateUserRequest = async (data, id) => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'PUT',
    url: `api/users/update/${id}`,
    data,
  });
  return { response: response.data, status: response.status };
};

const getMessages = async () => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'GET',
    url: `api/communications/user/messages`,
  });
  return { response: response.data, status: response.status };
};

const deleteUserRequest = async (id) => {
  const response = await axiosInstance({
    headers: headerWithAuthorization(),
    method: 'DELETE',
    url: `api/users/delete/${id}`,
  });
  return { response: response.data, status: response.status };
};

const createMessageRequest = async (data) => {
  const response = await axiosInstance({
    data,
    headers: headerWithAuthorization(),
    method: 'POST',
    url: `api/communications/messages/create`,
  });
  return { response: response.data, status: response.status };
};

const services = {
  createMessageRequest,
  deleteUserRequest,
  getMessages,
  deletePropertyRequest,
  signupRequest,
  loginRequest,
  createPropertyRequest,
  getPropertiesRequest,
  createAppointmentRequest,
  updateUserRequest,
  getAppointmentsRequest,
  getUserRequest,
  getUsersRequest,
};

export default services;
