import React from "react";
import { Button, Card } from "react-bootstrap";
import messageService from "../services/messages";

export default function Message({ message }) {
  const deleteMessage = () => {
    messageService.deleteOne(message._id);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{message.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          From: {message.from}
        </Card.Subtitle>
        <Card.Text>{message.body}</Card.Text>
        <Card.Link href="#" variant="primary">
          <Button variant="danger" onClick={deleteMessage}>
            delete
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
