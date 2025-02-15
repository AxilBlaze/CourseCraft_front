import { api } from '../api';

// Inside your component
const handleSendMessage = async (message) => {
  try {
    const response = await api.chat.sendMessage(message);
    // Handle the response
  } catch (error) {
    // Handle any errors
    console.error('Failed to send message:', error);
  }
}; 