import React from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Message from "./Message";
import messageService from "../services/messages";
import MessageAlert from "./MessageAlert";

export default function Messages({
  messages,
  to,
  title,
  body,
  setTo,
  setTitle,
  setBody,
  setMessageColor,
  setMessage,
}) {
  const handleClick = (e) => {
    e.preventDefault();

    messageService
      .sendMessage({ to: to, title: title, body: body })
      .then((i) => {
        setMessage("Message successfully sent");
        setMessageColor("success");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((err) => {
        setMessageColor("danger");
        setMessage("Something went wrong, try again");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };
  return (
    <div>
      <Row>
        <Col>
          <h1>Messages</h1>
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        </Col>

        <Col>
          <Form onSubmit={handleClick}>
            <Form.Group controlId="to">
              <Form.Label>to</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter social security number"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Label>body</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Message"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="Send">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
