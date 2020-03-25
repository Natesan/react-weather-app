import React from "react";

const Cities = props => {
  const getCities = props.cityList.map(city => (
    <button
      key={city}
      onClick={() => props.onSelection(city)}
      className="btn btn-outline-dark my-1 mx-1"
    >
      {city}
    </button>
  ));

  return (
    <React.Fragment>
      <div className="my-3 d-flex flex-wrap justify-content-center align-items-stretch align-self-stretch">
        {getCities}
      </div>
    </React.Fragment>
  );
};

export default Cities;
