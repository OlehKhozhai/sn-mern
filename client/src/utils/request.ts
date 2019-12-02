import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common['x-auth-token'] = token;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common['x-auth-token'] = null;
};

export default axios;
