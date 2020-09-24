import React from "react";

const ThemeToggler = (props) => (
  <div
    className="inline-flex theme-toggle"
    role="group"
    aria-label="Toggle Theme"
  >
    <button
      type="button"
      onClick={props.darkMode.disable}
      className="btn btn-sm btn-light"
    >
      Light
    </button>
    <button
      type="button"
      onClick={props.darkMode.enable}
      className="btn btn-sm btn-dark"
    >
      Dark
    </button>
  </div>
);

export default ThemeToggler;
