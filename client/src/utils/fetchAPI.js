const API_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : '';

export const fetchAPI = async (endpoint, options = {}) => {
  const url = API_URL ? `${API_URL}${endpoint}` : endpoint;
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });
  return response;
};
