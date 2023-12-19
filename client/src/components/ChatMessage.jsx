// ChatMessage.js
import React from 'react';

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.user ? 'user' : 'ai'}`}>
      {message.text}
    </div>
  );
}

export default ChatMessage;