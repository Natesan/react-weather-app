import React from "react";

const ThemeToggler = props => (
  <div class="inline-flex theme-toggle" role="group" aria-label="Toggle Theme">
    <button
      type="button"
      onClick={props.darkMode.disable}
      class="btn btn-sm btn-light"
    >
      Light
    </button>
    <button
      type="button"
      onClick={props.darkMode.enable}
      class="btn btn-sm btn-dark"
    >
      Dark
    </button>
  </div>
);

export default ThemeToggler;
