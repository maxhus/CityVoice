import React, { useState } from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <button
        className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        📋 Toutes
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-btn ${activeCategory === category.name ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.name)}
          style={{ 
            backgroundColor: activeCategory === category.name ? category.color : 'transparent',
            color: activeCategory === category.name ? 'white' : '#666',
            borderColor: category.color
          }}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
