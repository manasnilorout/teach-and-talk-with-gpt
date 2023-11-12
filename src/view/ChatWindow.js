import React, { useState, useRef, useEffect } from "react";

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

function ChatGPT() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef();

  const env = "local";
  const serverUrl = env === "production" ? "https://teach-and-talk-with-gpt-production.up.railway.app" : "http://localhost:3000";

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const newMessages = [...messages, { text: inputValue, user: true }];
    setMessages(newMessages);

    const response = await fetch(`${serverUrl}/ai/get-answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputValue }),
    });
    const data = await response.json();

    setMessages([...newMessages, { text: data.answer, user: false }]);
    setInputValue("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", backgroundColor: "#212121", padding: 10, borderRadius: 10 }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Periodic Library</h1>
      <div
        style={{
          border: "1px solid #4CAF50",
          minHeight: 260, // Increased the height by 30%
          maxHeight: 260, // Increased the maxHeight by 30%
          padding: 10,
          overflowY: "scroll",
          backgroundColor: "#424242",
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} text={message.text} user={message.user} />
        ))}
        <div ref={messagesEndRef} />
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

function App() {
  return <ChatGPT />;
}

export default App;