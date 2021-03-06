import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the header of the application with the Get Weather Button", () => {
  act(() => {
    render(<App />, container);
  });

  expect(container.querySelector(".title").textContent).toBe("Weather Now");

  expect(container.querySelector("button").textContent).toBe("Get Weather");
});
