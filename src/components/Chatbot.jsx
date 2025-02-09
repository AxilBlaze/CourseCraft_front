import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const responses = {
    "I need help with lesson planning": "You can check out resources on Edutopia for lesson planning ideas.",
    "I'm struggling with classroom management": "Consider reading articles on classroom management strategies on Teaching Strategies.",
    "How can I engage my students better?": "Khan Academy has great resources on interactive teaching methods.",
    "What tools can I use for assessments?": "Coursera offers courses on assessment tools and techniques.",
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      const response = responses[input] || "I'm sorry, I don't have information on that.";
      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
      setInput('');
    }
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-purple-600 mb-2">Chatbot</h3>
      <div className="h-64 overflow-y-auto border border-gray-300 p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
      </div>
    </div>
  );
};

export default Chatbot; 