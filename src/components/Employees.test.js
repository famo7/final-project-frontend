import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Employees from "./Employees";

test("renders employee content", () => {
  // mock attendances data
  let attendances = [
    { date: { year: 2021, month: 3, day: 20 }, _id: "1321312" },
    { date: { year: 2021, month: 4, day: 20 }, _id: "2111323" },
  ];
  // mock tasks data
  let tasks = [
    {
      _id: "111112",
      title: "test title",
      createdBy: "famo",
      description: "test desc",
      deadLine: "2021-07-10",
    },
    {
      _id: "123123d2",
      title: "test title",
      createdBy: "famo",
      description: "test desc",
      deadLine: "2021-07-10",
    },
  ];
  // mock employees data
  let employees = [
    {
      _id: "1",
      firstName: "fname1",
      lastName: "lName1",
      email: "test@gmail.com",
      address: "testaddress 1",
      salary: "20000",
      phone: "111111",
      department: "ekonomi",
      attendances: attendances,
      tasks: tasks,
    },
  ];
  // render Employees component with employees prop

  const component = render(<Employees employees={employees} />);

  // check if the first employees firstName is right
  expect(component.container).toHaveTextContent(employees[0].firstName);
});
