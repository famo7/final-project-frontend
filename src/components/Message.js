import React from "react";

export default function Message({ message }) {
  return (
    <div>
      {message.title}
      {message.body}
    </div>
  );
}
