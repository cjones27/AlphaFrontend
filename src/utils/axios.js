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
  const response = await axiosInstance({
    method: 'POST',
    url: '/api/users/future/signup',
    data,
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

const services = {
  deletePropertyRequest,
  signupRequest,
  loginRequest,
  createPropertyRequest,
  getPropertiesRequest,
  createAppointmentRequest,
  getAppointmentsRequest,
};

export default services;
