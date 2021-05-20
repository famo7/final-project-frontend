import React from "react";
import { Table } from "react-bootstrap";

export default function Employee({ employee, setEmployee }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.email}</td>
        </tr>
      </tbody>
    </Table>
  );
}
