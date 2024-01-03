import React from 'react';
import { StatusOptions, PriorityOptions } from '../../constants';

const TaskFilterBar = ({
  searchTerm,
  onSearchChange,
  filterPriority,
  onPriorityChange,
  filterStatus,
  onStatusChange,
}) => {
  return (
    <div className="filter-container">
      <label>Search: </label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label>Priority: </label>
      <select
        value={filterPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="All">All</option>
        {PriorityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label>Status: </label>
      <select
        value={filterStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All</option>
        {StatusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilterBar;
