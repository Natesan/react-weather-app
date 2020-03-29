import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Cities from "./Cities";

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

const fakeProps = {
  cities: ["Mountain View", "San Diego", "Los Angeles"],
  onCitySelection: () => {}
};

it("cities render without crashing", () => {
  act(() => {
    render(
      <Cities
        cityList={fakeProps.cities}
        onSelection={fakeProps.onCitySelection}
      ></Cities>,
      container
    );
  });
});
