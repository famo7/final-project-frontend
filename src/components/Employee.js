import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";

import taskService from "../services/tasks";
import attendanceService from "../services/attendances";
export default function Employee({ employee, setEmployees, employees, user }) {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [absent, setAbsent] = useState(false);
  const [vacation, setVacation] = useState(false);
  const [show, setShow] = useState(false);
  const delAttendance = (id) => {
    attendanceService.setToken(user.token);
    attendanceService.deleteOne(id);

    let newAtts = employee.attendances.filter((i) => {
      return i._id !== id;
    });

    setEmployees(
      [...employees].map((object) => {
        if (object._id === employee._id) {
          return {
            ...object,
            attendances: newAtts,
          };
        } else return object;
      })
    );
  };

  const handleUpdate = (id) => {
    setShow(false);
    const data = {
      date: date,
      absent: absent,
      vacation: vacation,
      reason: reason,
    };
    attendanceService.setToken(user.token);
    attendanceService
      .updateAttendance(id, data)
      .then((i) => {})
      .catch((ex) => {});
  };
  const getAttDesc = (attendance) => {
    let description = "";
    if (attendance.absent) {
      description = attendance.reason;
    } else {
      description = "Not absent";
    }
    return description;
  };
  const delTask = (id) => {
    taskService.setToken(user.token);
    taskService.deleteTask(id);
    let newTask = employee.tasks.filter((i) => {
      return i._id !== id;
    });

    setEmployees(
      [...employees].map((object) => {
        if (object._id === employee._id) {
          return {
            ...object,
            tasks: newTask,
          };
        } else return object;
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

            <td>{employee.department}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col>
          <h5>Attendances</h5>
          {employee.attendances.map((att) => (
            <Card className="col-xs-3 mb-3" key={att._id}>
              <Card.Header>
                Date: {att.date.year}/{att.date.month} /{att.date.day}
              </Card.Header>
              <Card.Body>
                <Card.Text>{getAttDesc(att)}</Card.Text>

                <Button
                  onClick={() => delAttendance(att._id)}
                  variant="danger"
                  className="mr-5"
                >
                  Delete Attendance
                </Button>
                {!show ? (
                  <Button className="mr-5" onClick={() => setShow(true)}>
                    Update
                  </Button>
                ) : null}
                {show ? (
                  <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="reason">
                      <Form.Label>Reason</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        style={{ width: "100%" }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Vacation"
                        onClick={() => setVacation(!vacation)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Absent"
                        onClick={() => setAbsent(!absent)}
                      />
                    </Form.Group>

                    <Button type="submit">Update Attendance</Button>
                  </Form>
                ) : null}
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col>
          <h5>Tasks</h5>
          {employee.tasks.map((task) => (
            <Card className="col-xs-3 mb-3" key={task._id}>
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
