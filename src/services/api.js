import axios from 'axios';

const API_BASE_URL = 'http://193.19.100.32:7000/api';

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const signUp = async (candidate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign-up`, candidate);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const getCode = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-code`, { params: { email } });
    return response.data;
  } catch (error) {
    console.error('Error fetching code:', error);
    throw error;
  }
};

export const setStatus = async (token, status) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/set-status`, { token, status });
    return response.data;
  } catch (error) {
    console.error('Error setting status:', error);
    throw error;
  }
};
