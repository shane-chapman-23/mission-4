import {useState, useEffect} from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/chat/")
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  // const handleUserInputSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!userInput) return;
  // };

  // const updateMessages = (name, message) => {
  //   setMessages((prev) => [...prev, {role: name, content: message}]);
  // };

  return <></>;
}
