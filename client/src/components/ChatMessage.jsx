import React from "react";

const ChatMessage = ({ message }) => {
  const { text, user } = message;

  return (
    <div className={`chat-message ${user ? "user-message" : "ai-message"}`}>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default ChatMessage;