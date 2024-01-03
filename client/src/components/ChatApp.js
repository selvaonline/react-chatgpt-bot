import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
// Import your spinner component here
import Spinner from './Spinner'; // This is an example. Adjust based on your spinner component.

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Send user message to the server
    const response = await fetch("/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputText }),
    });

    const data = await response.json();
    setIsLoading(false); // Stop loading

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
        {isLoading && <Spinner />} {/* Display the spinner when loading */}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatApp;
