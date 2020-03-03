import React from 'react';


export const SearchBox = ({ search, updateSearch, placeholder }) => (
  <div>
    <input
      type="text"
      className="search-bar"
      value={search}
      onChange={updateSearch}
      placeholder={placeholder}
    />
    <button type="submit" className="search-button">
      <i className="fas fa-search" />
    </button>
  </div>
);

export default SearchBox;