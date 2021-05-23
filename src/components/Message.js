import React from "react";
import { Button, Card } from "react-bootstrap";
import messageService from "../services/messages";
import timeService from "../services/time";

export default function Message({ message, setMessages, messages }) {
  const deleteMessage = () => {
    // delete message and filter it from the  messages array
    messageService.deleteOne(message._id);
    setMessages(messages.filter((i) => i._id !== message._id));
  };

  return (
    // display a message using card
    <Card style={{ width: "18rem" }}>
      <Card.Header>
        received: {timeService.formatTime(message.date)}
      </Card.Header>
      <Card.Body>
        <Card.Title>{message.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          From: {message.from}
        </Card.Subtitle>
        <Card.Text>{message.body}</Card.Text>

        {/* deletemessage function is fired on click */}
        <Button variant="danger" onClick={deleteMessage}>
          delete
        </Button>
      </Card.Body>
    </Card>
  );
}
