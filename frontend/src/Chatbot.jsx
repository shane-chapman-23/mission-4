import {useState, useEffect, useRef} from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const res = await fetch("http://localhost:5000/chat/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: userInput}),
    });

    const data = await res.json();

    setUserInput("");
    setMessages(data.history);

    console.log(data.history);
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        height: "500px", // set a fixed height for the chat
      }}
    >
      <h1>Tina</h1>
      <div
        style={{
          flex: 1, // take up remaining space
          marginBottom: 16,
          background: "#f9f9f9",
          padding: 8,
          borderRadius: 4,
          overflowY: "auto", // make it scrollable
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 && (
          <div style={{color: "#888"}}>No messages yet.</div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "4px 0",
            }}
          >
            <strong>{msg.role === "user" ? "You" : "Tina"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleUserInputSubmit} style={{display: "flex", gap: 8}}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{flex: 1, padding: 8}}
        />
        <button type="submit" style={{padding: "8px 16px"}}>
          Send
        </button>
      </form>
    </div>
  );
}
