import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Employee from "./Employee";
import employeeService from "../services/employees";
import taskService from "../services/tasks";
import stats from "../services/stats";
export default function Employees({
  employees,
  setEmployees,
  user,
  setMessage,
  setMessageColor,
  stats,
  setStats,
}) {
  // all states for employee
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);
  const [socialNum, setSocialNum] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const handleCreateTask = (e) => {
    // prevent default on submit
    e.preventDefault();
    // get the data using the states
    const data = {
      title: title,
      description: description,
      assignedTo: assignedTo,
      deadLine: deadLine,
    };

    // setToken and create a new Task
    taskService.setToken(user.token);
    taskService
      .createTask(data)
      .then((i) => {
        // success message
        setMessage("Task successfully assigned");
        setMessageColor("success");
        setTimeout(() => {
          setMessage(null);
          window.location.reload();
        }, 5000);
      })
      .catch((ex) => {
        // error message
        setMessage("something went wrong");
        setMessageColor("danger");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };
  const handleCreateEmp = (e) => {
    // prevent default
    e.preventDefault();
    // setToken and create employee using employee service
    employeeService.setToken(user.token);
    employeeService
      .createEmp({
        firstName: firstName,
        lastName: lastName,
        address: address,
        salary: salary,
        email: email,
        phone: phone,
        socialSecurityNumber: socialNum,
        password: "123",
        isManager: false,

        employed: true,
        department: department,
      })
      .then((i) => {
        // update state by adding to the employees state
        setEmployees(employees.concat(i));
        // success message
        setMessage("Employee successfully created");
        setMessageColor("success");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((ex) => {
        // error message if error
        setMessage("Something went wrong, try again");
        setMessageColor("danger");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };
  return (
    // render all employees using Employee component
    <div>
      <h1>Employees</h1>
      <Row>
        <Col xs={3}>
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

        <Col xs={3}>
          <h2>Assign Task</h2>
          {/* when form for task creation is submited, call handleCreateTask */}
          <Form onSubmit={handleCreateTask}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                // set title
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                // setDescription when state changes
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                style={{ width: "100%" }}
                value={deadLine}
                // set Deadline when state changes
                onChange={(e) => setDeadLine(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="assignedTo">
              <Form.Label>Task to</Form.Label>
              <Form.Control
                type="text"
                placeholder="Social sec in form: 111111-1111"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Assign
            </Button>
          </Form>
        </Col>

        <Col xs={3}>
          <h2>Create employee</h2>
          {/* when form for Employee creation is submited, call handleCreateEmp */}
          <Form onSubmit={handleCreateEmp}>
            <Form.Group controlId="firstName">
              <Form.Label>firstName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>lastName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="soc">
              <Form.Label>Social security number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter social security number"
                value={socialNum}
                onChange={(e) => setSocialNum(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Employed"
                onClick={() => setIsEmployed(!isEmployed)}
              />
              <Form.Check
                type="checkbox"
                label="Manager"
                onClick={() => setIsManager(!isManager)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Col>
        <Col xs={3}>
          <h1>{stats.finished}</h1>
        </Col>
      </Row>
    </div>
  );
}
