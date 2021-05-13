import React from "react";
import Message from "./Message";

export default function Messages({ messages }) {
  return (
    <div>
      <h1>Messages</h1>
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}
