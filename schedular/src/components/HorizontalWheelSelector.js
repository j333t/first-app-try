import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './HorizontalWheelSelector.css'; // optional CSS for styling

const HorizontalWheelSelector = ({ label, options, onSelect }) => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="wheel-selector">
      <label className="selector-label">{label}</label>
      <Slider {...sliderSettings}>
        {options.map((option, index) => (
          <div key={index} onClick={() => onSelect(option)}>
            <button className="wheel-option">{option}</button>
          </div>
        ))}
      </Slider>
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
