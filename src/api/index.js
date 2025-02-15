const API_URL = import.meta.env.VITE_API_URL;

console.log('API_URL:', API_URL); // Debug log

// Example API client configuration
export const makeApiCall = async (endpoint, options = {}) => {
  const fullUrl = `${API_URL}${endpoint}`;
  console.log('Making API call to:', fullUrl); // Debug log
  
  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });
    
    console.log('Response status:', response.status); // Debug log
    
    if (!response.ok) {
      if (response.status === 503 || response.status === 504) {
        throw new Error('Server is warming up, please try again in a moment.');
      }
      const errorText = await response.text();
      console.log('Error response:', errorText); // Debug log
      throw new Error(`API call failed: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data); // Debug log
    return data;
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