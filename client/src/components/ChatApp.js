import React, { useState } from "react";
import ChatMessage from "./ChatMessage";

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send user message to the server
    const response = await fetch("/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputText }),
    });

    const data = await response.json();

    // Update chat messages with the server's response
    setMessages([
      ...messages,
      { text: inputText, user: true },
      { text: data.message, user: false },
    ]);
    setInputText("");
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatApp;
