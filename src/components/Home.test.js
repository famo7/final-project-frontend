import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Home from "./Home";

test("renders home content", () => {
  // mock tasks data
  let tasks = [
    {
      _id: "12323",
      title: "test title",
      createdBy: "famo",
      description: "test desc",
      deadLine: "2021-07-10",
    },
  ];

  // render Home component
  const component = render(<Home tasks={tasks} isManager={false} />);

  // see if it contains the right header when the user is not a manager
  expect(component.container).toHaveTextContent("your tasks");
});
