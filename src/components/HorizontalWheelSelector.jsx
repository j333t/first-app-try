import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const durations = [
  { label: '1 min', value: 1 },
  { label: '5 mins', value: 5 },
  { label: '10 mins', value: 10 },
  { label: '15 mins', value: 15 },
  { label: '20 mins', value: 20 },
  { label: '30 mins', value: 30 },
  { label: '45 mins', value: 45 },
  { label: '1 hr', value: 60 },
  { label: '2 hrs', value: 120 },
  { label: '3 hrs', value: 180 },
  { label: '4 hrs', value: 240 },
  { label: '5 hrs', value: 300 },
  { label: '6 hrs', value: 360 },
  { label: '7 hrs', value: 420 },
  { label: '8 hrs', value: 480 }
];

const HorizontalWheelSelector = ({ onSelect }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    focusOnSelect: true,
    variableWidth: true,
    swipeToSlide: true,
    afterChange: (index) => onSelect(durations[index].value),
  };

  return (
    <Slider {...settings}>
      {durations.map((duration, index) => (
        <div key={index}>
          <div style={{ padding: '10px', textAlign: 'center' }}>
            {duration.label}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HorizontalWheelSelector;
