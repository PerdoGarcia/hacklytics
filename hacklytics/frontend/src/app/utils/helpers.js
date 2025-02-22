// utils/helpers.js
const BASE_URL = 'http://localhost:8000';

// Base request helper
const makeRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// HTTP method helpers
export const api = {
  get: (endpoint) => makeRequest(endpoint),
  post: (endpoint, body) => makeRequest(endpoint, 'POST', body),
  put: (endpoint, body) => makeRequest(endpoint, 'PUT', body),
  patch: (endpoint, body) => makeRequest(endpoint, 'PATCH', body),
  delete: (endpoint) => makeRequest(endpoint, 'DELETE')
};

// Then use them like:
// const data = await api.get('/api/events/KXROBOTMARS-35');
// const newOrder = await api.post('/api/orders', { ticker: 'SOME-TICKER' });