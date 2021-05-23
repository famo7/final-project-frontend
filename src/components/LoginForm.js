import React from "react";
import { Button, Col, Form } from "react-bootstrap";

export default function LoginForm({
  handleLogin,
  socialSecurityNumber,
  setSocialSecurityNumber,
  password,
  setPassword,
}) {
  return (
    // handleLogin function is fired on click
    // login form
    <Form onSubmit={handleLogin} className="border container">
      <Col xs={6}>
        <Form.Group controlId="socialSecurityNumber">
          <Form.Control
            required
            type="text"
            placeholder="Enter social security number"
            value={socialSecurityNumber}
            onChange={(e) => setSocialSecurityNumber(e.target.value)}
          />
        </Form.Group>
      </Col>

      <Col xs={6}>
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
      </Col>
      <Button variant="primary" type="submit">
        sign in
      </Button>
    </Form>
  );
}
