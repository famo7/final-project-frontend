import React from "react";
import { Col, Row } from "react-bootstrap";
import Employee from "./Employee";

export default function Employees({ employees, setEmployees, user }) {
  return (
    <div>
      <h1>Employee</h1>
      <Row>
        <Col>
          {employees.map((employee) => (
            <Employee
              key={employee._id}
              employee={employee}
              setEmployees={setEmployees}
              employees={employees}
              user={user}
            />
          ))}
        </Col>
        <Col>Add Employee</Col>
      </Row>
    </div>
  );
}
