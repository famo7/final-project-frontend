import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";

import taskService from "../services/tasks";
export default function Employee({ employee, setEmployees, employees, user }) {
  const delTask = (id) => {
    taskService.setToken(user.token);
    taskService.deleteTask(id);

    setEmployees(
      employees.tasks.filter((i) => {
        return i._id !== id;
      })
    );
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Phone</th>
            <th>Social security number</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.salary}</td>
            <td>{employee.phone}</td>
            <td>{employee.socialSecurityNumber}</td>
            <td>{employee.department}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col>
          <h5>Attendances</h5>
        </Col>
        <Col>
          <h5>Tasks</h5>
          {employee.tasks.map((task) => (
            <Card className="col-xs-3" key={task._id}>
              <Card.Header>created by: {task.createdBy}</Card.Header>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>

                <Card.Text>{task.description}</Card.Text>
                <Card.Text>{task.status}</Card.Text>
                <Button onClick={() => delTask(task._id)} variant="danger">
                  Delete Task
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
}
