import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Tasks from "./Tasks";

test("renders tasks and nested task", () => {
  // mock data for testing tasks
  let tasks = [
    {
      _id: "22313214",
      title: "test title",
      createdBy: "famo",
      description: "test desc",
      deadLine: "2021-07-10",
    },
    {
      _id: "121312",
      title: "test title",
      createdBy: "famo",
      description: "test desc",
      deadLine: "2021-07-10",
    },
  ];

  // render the Tasks component
  const component = render(<Tasks tasks={tasks} />);

  // see who created first task
  expect(component.container).toHaveTextContent(
    "Task from : " + tasks[0].createdBy
  );
});
