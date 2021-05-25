import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Table,
  Accordion,
} from "react-bootstrap";

import taskService from "../services/tasks";
import attendanceService from "../services/attendances";
export default function Employee({ employee, setEmployees, employees, user }) {
  // states needed
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [absent, setAbsent] = useState(false);
  const [vacation, setVacation] = useState(false);
  const [show, setShow] = useState(false);

  // for the model when attendace is updated
  const handleClose = () => setShow(false);

  const delAttendance = (id) => {
    // delete attendance
    attendanceService.setToken(user.token);
    attendanceService.deleteOne(id);

    let newAtts = employee.attendances.filter((i) => {
      return i._id !== id;
    });

    // update state
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
    // after update is clicked, hide the form modal
    setShow(false);
    // conver the date state to appropiate form
    const dt = new Date(date).toISOString().slice(0, 10);
    var dateObj = new Date(dt);

    //extract year, month, day
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    // create the data to update
    const data = {
      date: { year: year, month: month, day: day },
      absent: absent,
      vacation: vacation,
      reason: reason,
    };
    // update data using attandance service
    attendanceService.setToken(user.token);
    attendanceService
      .updateAttendance(id, data)
      .then((i) => {
        let newAtt = employee.attendances.filter((item) => {
          return item._id !== id;
        });
        newAtt = newAtt.concat(i);

        //update state
        setEmployees(
          [...employees].map((object) => {
            if (object._id === employee._id) {
              return {
                ...object,
                attendances: newAtt,
              };
            } else return object;
          })
        );
      })
      .catch((ex) => {});
  };

  // function for string representation of attendance description
  const getAttDesc = (attendance) => {
    let description = "";
    if (attendance.absent) {
      description = "Reason: " + attendance.reason;
    } else {
      description = "Not absent";
    }
    return description;
  };
  const delTask = (id) => {
    //setToken
    taskService.setToken(user.token);
    // delete task using id

    taskService.deleteTask(id);

    let newTask = employee.tasks.filter((i) => {
      return i._id !== id;
    });

    // update state
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
    <Table>
      <Row>
        <Table striped bordered hover>
          {/* display employee data using table*/}
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
        <Col>
          <Accordion defaultActiveKey="0">
            <Card border="success" bg="primary">
              {/* display employee attendances data using card*/}
              <Card.Header>
                <Accordion.Toggle as={Button} variant="button" eventKey="1">
                  <h5>Attendances</h5>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {employee.attendances.map((att) => (
                    <Card className="col-xs-3 mb-3" key={att._id}>
                      <Card.Header>
                        Date: {att.date.year}/{att.date.month}/{att.date.day}
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
                        <Button className="mr-5" onClick={() => setShow(true)}>
                          Update
                        </Button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          animation={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Update Attendance</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {/* use form inside modal body*/}

                            <Form>
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
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            {/* if clicked update attendance, call handleUpdate function*/}

                            <Button
                              type="button"
                              onClick={() => handleUpdate(att._id)}
                            >
                              Update Attendance
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col>
          <Accordion defaultActiveKey="0">
            <Card border="success" bg="primary">
              {/* display employee tasks using card*/}
              <Card.Header>
                <Accordion.Toggle as={Button} variant="button" eventKey="1">
                  <h5>Tasks</h5>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {employee.tasks.map((task) => (
                    <Card className="col-xs-3 mb-3" key={task._id}>
                      <Card.Header>created by: {task.createdBy}</Card.Header>
                      <Card.Body>
                        <Card.Title>{task.title}</Card.Title>

                        <Card.Text>{task.description}</Card.Text>
                        <Card.Text>{task.status}</Card.Text>
                        {/* call delTask with task id when clicked*/}
                        <Button
                          onClick={() => delTask(task._id)}
                          variant="danger"
                        >
                          Delete Task
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Table>
  );
}
