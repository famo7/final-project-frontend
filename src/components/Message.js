import React from "react";
import { Button, Card } from "react-bootstrap";
import messageService from "../services/messages";
import { format } from "date-fns";
export default function Message({ message, setMessages, messages }) {
  const deleteMessage = () => {
    messageService.deleteOne(message._id);
    setMessages(messages.filter((i) => i._id != message._id));
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>
        received: {format(new Date(message.date), "MM/dd/yyyy HH:mm")}
      </Card.Header>
      <Card.Body>
        <Card.Title>{message.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          From: {message.from}
        </Card.Subtitle>
        <Card.Text>{message.body}</Card.Text>

        <Button variant="danger" onClick={deleteMessage}>
          delete
        </Button>
      </Card.Body>
    </Card>
  );
}
