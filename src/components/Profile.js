import React from "react";
import { Button, Form } from "react-bootstrap";
import UserUpdate from "../services/UserUpdate";

export default function Profile({
  newAddress,
  setNewAddress,
  newPass,
  setNewPass,
  userId,
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
    } catch (exeption) {
      console.log(exeption);
    }
  };

  return (
    // form for updating user profile(address and password)
    <div className="container">
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
    </div>
  );
}
