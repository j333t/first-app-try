import React from 'react';
import Slider from 'react-slick';
import './HorizontalWheelSelector.css'; // optional CSS for styling

const HorizontalWheelSelector = ({ label, options, onSelect }) => {
  return (
    <div className="wheel-selector">
      <label className="selector-label">{label}</label>
      <div className="wheel-container">
        {options.map((option, index) => (
          <button 
            key={index} 
            className="wheel-option" 
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export const MultipleDaySelectors = ({ days, durations, onSelectDuration }) => {
  return (
    <div>
      {days.map((day, index) => (
        <HorizontalWheelSelector
          key={index}
          label={`Day ${day}`}
          options={durations}
          onSelect={(duration) => onSelectDuration(day, duration)}
        />
      ))}
    </div>
  );
};

export default HorizontalWheelSelector;
