import {useState} from "react";

export default function Chatbot() {
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [jobInput, setJobInput] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    if (!userInput) return;

    updateMessages("user", userInput);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ``,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, {role: "user", content: userInput}],
          }),
        }
      );

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        console.error("No choices returned:", data);
        return;
      }

      const question = data.choices[0]?.message?.content?.trim();
      if (!question) {
        console.error("No question returned:", data);
        return;
      }

      // Update messages with AI response
      updateMessages("assistant", question);
    } catch (error) {
      console.error("Error talking to GPT-3.5:", error);
    }
    setUserInput("");
    console.log(messages);
  };

  const updateMessages = (name, message) => {
    setMessages((prev) => [...prev, {role: name, content: message}]);
  };

  return (
    <div style={{width: "400px", margin: "0 auto", fontFamily: "sans-serif"}}>
      <h2>Job Interview Chatbot</h2>

      {/* Job title input */}
      {!jobTitle && (
        <form onSubmit={handleJobTitleSubmit} style={{marginBottom: "20px"}}>
          <input
            type="text"
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            placeholder="Enter Job Title"
            style={{width: "70%", padding: "8px"}}
          />
          <button type="submit" style={{padding: "8px"}}>
            Start
          </button>
        </form>
      )}

      {/* Chat window */}
      {jobTitle && (
        <>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "300px",
              overflowY: "scroll",
              marginBottom: "10px",
            }}
          >
            {messages
              .filter((msg) => msg.role !== "system") // skip system messages
              .map((msg, idx) => (
                <div key={idx} style={{margin: "5px 0"}}>
                  <strong>
                    {msg.role === "assistant" ? "Interviewer" : "You"}:
                  </strong>{" "}
                  {msg.content}
                </div>
              ))}
          </div>

          {/* User input */}
          <form onSubmit={handleUserInputSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              style={{width: "70%", padding: "8px"}}
            />
            <button type="submit" style={{padding: "8px"}}>
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}
