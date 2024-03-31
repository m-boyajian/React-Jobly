import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }
  
  // updates form fields
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          name="searchterm"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleChange}
          />
        <button type="submit" className="search-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default SearchForm;