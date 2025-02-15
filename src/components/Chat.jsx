import { useState, useEffect } from 'react';
import { api } from '../api';

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Add this to check if backend is available
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/health');
        console.log('Backend status:', response.status);
      } catch (error) {
        console.error('Backend check failed:', error);
      }
    };
    checkBackendStatus();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await api.chat.sendMessage(inputMessage);
      setMessages(prev => [
        ...prev, 
        { type: 'user', content: inputMessage },
        { type: 'bot', content: response.message }
      ]);
      setInputMessage('');
    } catch (error) {
      setError(error.message);
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}-message`}>
            {msg.content}
          </div>
        ))}
        
        {loading && (
          <div className="loading-message">
            AI Tutor is thinking...
          </div>
        )}
        
        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !inputMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 