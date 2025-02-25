import axios from 'axios';
import {BASE_URL} from './ApiConfig';
import {Constants} from '../constants/Constants';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 2, // 2 minutes timeout
});

const getAuthHeaders = (customHeaders = null) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: Constants.userAuthToken
      ? `Bearer ${Constants.userAuthToken}`
      : '',
  };

  return customHeaders ? {...defaultHeaders, ...customHeaders} : defaultHeaders;
};

axiosInstance.interceptors.request.use(
  config => config,
  error => {
    console.error('Request error:', error.response || error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Response error:', error.response || error);
    return Promise.reject(error);
  },
);

export const apiCall = async (
  method = 'POST',
  body = null,
  url = '',
  headers = null,
) => {
  const config = {
    method: method.toLowerCase(),
    headers: getAuthHeaders(headers),
  };

  // Handle different HTTP methods
  if (url) config.url = url;
  if (method.toLowerCase() === 'get' && body) config.params = body;
  if (method.toLowerCase() === 'post' && body) config.data = body;
  if (method.toLowerCase() !== 'get' && body) config.data = body;

  try {
    const response = await axiosInstance(config);
    return {statusCode: response.status, data: response.data};
  } catch (error) {
    console.error(error);

    let errorMessage = 'Something went wrong, Please try again later.';
    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.response?.data?.errors) {
      errorMessage = Array.isArray(error.response.data.errors)
        ? error.response.data.errors.join('\n')
        : typeof error.response.data.errors === 'object'
        ? Object.values(error.response.data.errors).join('\n')
        : error.response.data.errors;
    }

    // Handle specific HTTP status errors
    if (error?.response?.status === 502 || error?.response?.status === 404) {
      navigationRef.reset({
        index: 0,
        routes: [{name: 'TokenVerification'}],
      });
      throw {
        statusCode: error?.response?.status || 0,
        errorString: errorMessage,
      };
    }

    throw {
      statusCode: error?.response?.status || 0,
      errorString: errorMessage,
    };
  }
};
