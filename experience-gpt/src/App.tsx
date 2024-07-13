import React, { useState } from "react";
import "./App.css";
import { MessageItem, MessageProps } from "./components/message-item";
import { CallGPT } from "./api/call-gpt";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { id: number; role: MessageProps["role"]; content: string }[]
  >([]);
  const [messageId, setMessageId] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userMessage = {
      id: messageId,
      role: "user" as MessageProps["role"],
      content: input,
    };
    setMessages([...messages, userMessage]);
    setMessageId((prevId) => prevId + 1);
    setInput("");

    const gptResponse = await CallGPT(input);
    const gptMessage = {
      id: messageId + 1,
      role: "assistant" as MessageProps["role"],
      content: gptResponse,
    };
    setMessages((prevMessages) => [...prevMessages, gptMessage]);
    setMessageId((prevId) => prevId + 1);
  };

  return (
    <div className='App'>
      {messages.map((m) => (
        <MessageItem role={m.role} key={m.id} content={m.content} />
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          프롬프트 입력해줘용
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default App;
