import React, { useState } from 'react';

const DesktopSlider = ({ onSelect }) => {
  const [value, setValue] = useState(60);  // Default to 1 hour

  const handleChange = (e) => {
    const minutes = parseInt(e.target.value, 10);
    setValue(minutes);
    onSelect(minutes);
  };

  return (
    <div>
      <input
        type="range"
        min="1"
        max="480"
        step="1"
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <div>{`${Math.floor(value / 60)} hrs ${value % 60} mins`}</div>
    </div>
  );
};

export default DesktopSlider;
