import React, { useState, useEffect } from 'react';
import HorizontalWheelSelector from './HorizontalWheelSelector';  // Import mobile picker
import DesktopSlider from './DesktopSlider';  // Import desktop slider

const DurationSelector = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);  // Detect screen size for mobile
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();  // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    console.log('Selected duration:', duration);
  };

  return (
    <div>
      <h2>Select Task Duration</h2>
      {isMobile ? (
        <HorizontalWheelSelector onSelect={handleDurationSelect} />
      ) : (
        <DesktopSlider onSelect={handleDurationSelect} />
      )}
      {selectedDuration && <p>Selected: {selectedDuration} minutes</p>}
    </div>
  );
};

export default DurationSelector;
