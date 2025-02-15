const API_URL = import.meta.env.VITE_API_URL;

// Example API client configuration
export const makeApiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      if (response.status === 503 || response.status === 504) {
        throw new Error('Server is warming up, please try again in a moment.');
      }
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Example API endpoints
export const api = {
  // Chat related endpoints
  chat: {
    sendMessage: async (message) => {
      try {
        const response = await makeApiCall('/api/chat', {
          method: 'POST',
          body: JSON.stringify({ message }),
          timeout: 30000 // 30 second timeout
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    getHistory: () => makeApiCall('/api/chat/history', {
      method: 'GET'
    }),
  },
  
  // Other endpoints as needed
}; 