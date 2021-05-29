import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import UserUpdate from "../services/UserUpdate";

export default function Profile({
  newAddress,
  setNewAddress,
  newPass,
  setNewPass,
  userId,
  setMessage,
  setMessageColor,
  user,
}) {
  const handleUpdate = async (e) => {
    // prevent default form submit
    e.preventDefault();

    try {
      // update user data using userId
      await UserUpdate.update(userId, {
        address: newAddress,
        password: newPass,
      });
      setMessage(
        "Profile successfully updated, login again for it to take effect"
      );
      setMessageColor("success");
    } catch (exeption) {
      setMessage("Could not update profile, try again");
      setMessageColor("danger");
    }
  };

  return (
    // form for updating user profile(address and password)

    <Row className="container">
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Current Address</Card.Title>
            <Card.Text>{user.address}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="address">
            <Form.Label>address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
