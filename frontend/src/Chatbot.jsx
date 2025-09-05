import {useState} from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    if (!userInput) return;
  };

  const updateMessages = (name, message) => {
    setMessages((prev) => [...prev, {role: name, content: message}]);
  };

  return <></>;
}
