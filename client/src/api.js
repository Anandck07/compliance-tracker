import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || '/api';

export const getClients = () => axios.get(`${BASE}/clients`);
export const createClient = (data) => axios.post(`${BASE}/clients`, data);
export const getTasks = (clientId) => axios.get(`${BASE}/tasks/${clientId}`);
export const createTask = (data) => axios.post(`${BASE}/tasks`, data);
export const updateTaskStatus = (id, status) => axios.patch(`${BASE}/tasks/${id}`, { status });
