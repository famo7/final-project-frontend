import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MessageAlert from "./MessageAlert";

test("renders messages content", () => {
  // render MessageAlert with a text
  const component = render(<MessageAlert message={"test message"} />);

  // check if it has the right content
  expect(component.container).toHaveTextContent("test message");
});
