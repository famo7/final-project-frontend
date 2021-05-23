import React from "react";
import { Alert } from "react-bootstrap";

export default function MessageAlert({ message, color }) {
  return (
    // display message using Alert and a color
    <div className="container">
      {message && <Alert variant={color}>{message}</Alert>}
    </div>
  );
}
