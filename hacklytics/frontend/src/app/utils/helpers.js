// utils/helpers.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Base request helper for standard JSON responses
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

// Base request helper for streaming endpoints
const makeStreamRequest = async (endpoint, method = 'GET', body = null) => {
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

    // Return the raw response so the caller can use getReader()
    
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    return response;
  } catch (error) {
    console.error('Stream API Error:', error);
    throw error;
  }
};

// HTTP method helpers
export const api = {
  get: (endpoint) => makeRequest(endpoint),
  post: (endpoint, body) => makeRequest(endpoint, 'POST', body),
  // New helper for streaming endpoints:
  postStream: (endpoint, body) => makeStreamRequest(endpoint, 'POST', body),
  put: (endpoint, body) => makeRequest(endpoint, 'PUT', body),
  patch: (endpoint, body) => makeRequest(endpoint, 'PATCH', body),
  delete: (endpoint) => makeRequest(endpoint, 'DELETE')
};
