import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Messages from "./Messages";

test("renders messages content", () => {
  // moch messages data
  let messages = [
    {
      _id: "2232",
      date: "2021-07-10",
      title: "title 1",
      from: "test from 1",
      body: "test body 1",
    },
    {
      _id: "222",
      date: "2021-07-10",
      title: "title 2",
      from: "test from 2",
      body: "test body 2",
    },
  ];

  // render Messages component
  const component = render(<Messages messages={messages} />);

  // check expected title for first message
  expect(component.container).toHaveTextContent(messages[0].title);
});
