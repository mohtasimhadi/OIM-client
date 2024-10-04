import React from 'react';

interface FilterProps {
  filters: any;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRangeChange: (name: string, min: number, max: number) => void;
}

const Filters: React.FC<FilterProps> = ({ filters, handleFilterChange, handleRangeChange }) => (
  <div className="bg-white/10 p-4 rounded-lg shadow-md">
    <h2 className="text-white text-xl font-semibold mb-4">Filter Plants</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Text Input for Plant ID */}
      <input
        type="text"
        name="id"
        placeholder="Filter by Plant ID"
        className="p-2 rounded-md"
        value={filters.id || ''}
        onChange={handleFilterChange}
      />

      {/* Dropdown for Appearance */}
      <select
        name="appearance"
        className="p-2 rounded-md"
        value={filters.appearance || ''}
        onChange={handleFilterChange}
      >
        <option value="">Filter by Appearance</option>
        <option value="Healthy">Healthy</option>
        <option value="Unhealthy">Unhealthy</option>
      </select>

      {/* Dropdown for Rating */}
      <select
        name="rating"
        className="p-2 rounded-md"
        value={filters.rating || ''}
        onChange={handleFilterChange}
      >
        <option value="">Filter by Rating</option>
        <option value="Good">Good</option>
        <option value="Average">Average</option>
        <option value="Poor">Poor</option>
      </select>

      {/* Dual Range Inputs for numerical filters */}
      {[
        { label: 'Circularity', name: 'circularity', min: 0, max: 1 },
        { label: 'Eccentricity', name: 'eccentricity', min: 0, max: 1 },
        { label: 'Confidence Threshold', name: 'confidenceThreshold', min: 0, max: 1 },
      ].map((item) => (
        <div key={item.name} className="flex flex-col space-y-2">
          <label className="text-white font-semibold">{item.label}</label>
          <div className="flex space-x-4 items-center">
            <input
              type="number"
              value={filters[`${item.name}Min`] || item.min}
              min={item.min}
              max={filters[`${item.name}Max`] || item.max}
              onChange={(e) =>
                handleRangeChange(item.name, Number(e.target.value), filters[`${item.name}Max`] || item.max)
              }
              className="w-20 p-2 rounded-md"
            />
            <input
              type="range"
              name={`${item.name}Min`}
              min={item.min}
              max={item.max}
              step="0.01"
              value={filters[`${item.name}Min`] || item.min}
              onChange={(e) =>
                handleRangeChange(item.name, Number(e.target.value), filters[`${item.name}Max`] || item.max)
              }
              className="flex-1"
            />
            <input
              type="range"
              name={`${item.name}Max`}
              min={item.min}
              max={item.max}
              step="0.01"
              value={filters[`${item.name}Max`] || item.max}
              onChange={(e) =>
                handleRangeChange(item.name, filters[`${item.name}Min`] || item.min, Number(e.target.value))
              }
              className="flex-1"
            />
            <input
              type="number"
              value={filters[`${item.name}Max`] || item.max}
              min={filters[`${item.name}Min`] || item.min}
              max={item.max}
              onChange={(e) =>
                handleRangeChange(item.name, filters[`${item.name}Min`] || item.min, Number(e.target.value))
              }
              className="w-20 p-2 rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Filters;
