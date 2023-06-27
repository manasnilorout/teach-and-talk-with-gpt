// Import React and other required libraries
import React, { useState } from "react";

// ChatMessage component to display chat messages
function ChatMessage({ text, user }) {
  return (
    <div style={{ textAlign: user ? "right" : "left", paddingBottom: 5 }}>
      <div
        style={{
          display: "inline-block",
          borderRadius: 12,
          padding: 10,
          backgroundColor: user ? "#2E7D32" : "#7986CB",
          color: "white",
        }}
      >
        {text}
      </div>
    </div>
  );
}

// Main ChatGPT component
function ChatGPT() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Appending the user message to messages array
    const newMessages = [...messages, { text: inputValue, user: true }];
    setMessages(newMessages);

    // Send a POST request to API and get the answer
    const response = await fetch("/get-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputValue }),
    });
    const data = await response.json();

    // Appending the server response to messages array
    setMessages([...newMessages, { text: data.answer, user: false }]);
    setInputValue("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", backgroundColor: "#212121", padding: 10, borderRadius: 10 }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>ChatGPT</h1>
      <div
        style={{
          border: "1px solid #4CAF50",
          minHeight: 200,
          maxHeight: 200,
          padding: 10,
          overflowY: "scroll",
          backgroundColor: "#424242",
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} text={message.text} user={message.user} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} style={{ marginTop: 10 }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "100%", boxSizing: "border-box", backgroundColor: "#424242", color: "#4CAF50", borderColor: "#4CAF50" }}
        />
        <button type="submit" style={{ margin: "10px auto", display: "block", backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}>
          Send
        </button>
      </form>
    </div>
  );
}

// Rendering the ChatGPT component in the root element
function App() {
  return <ChatGPT />;
}

export default App;
