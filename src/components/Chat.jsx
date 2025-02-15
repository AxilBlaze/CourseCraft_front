import { useState } from 'react';
import { api } from '../api';

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.chat.sendMessage(message);
      setMessages(prev => [...prev, { type: 'user', content: message }, { type: 'bot', content: response.message }]);
    } catch (error) {
      setError(error.message);
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Display messages */}
      {messages.map((msg, index) => (
        <div key={index} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
          {msg.content}
        </div>
      ))}
      
      {/* Display loading state */}
      {loading && <div>AI Tutor is thinking...</div>}
      
      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Your message input form */}
    </div>
  );
};

export default Chat; 