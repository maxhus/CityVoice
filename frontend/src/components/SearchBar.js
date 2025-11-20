import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="search"
          placeholder="recherche"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
