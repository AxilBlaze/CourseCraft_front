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
    sendMessage: (message) => makeApiCall('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    }),
    getHistory: () => makeApiCall('/api/chat/history', {
      method: 'GET'
    }),
  },
  
  // Other endpoints as needed
}; 