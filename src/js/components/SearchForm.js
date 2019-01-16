import React from "react";

const SearchForm = props => (
    <div className="form-group">
      <h4>Find an Offense:</h4>
      <input
        onChange={props.handleInputChange}
        value={props.value}
        name="search"
        type="text"
        className="form-control"
        placeholder="Enter a Offense"
        id="search"
      />
      <br />
      <button onClick={props.handleFormSubmit} className="btn">
        Search
      </button>
    </div>
);

export default SearchForm;
