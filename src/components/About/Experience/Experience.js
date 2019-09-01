import React, { PropTypes } from 'react';
import Slider from "react-slick";

import ExperienceItem from './ExperienceItem';
import './Experience.scss';


const Experience = ({
  items,
}) => {
  if (!items || !items.length) return null;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="experience-carousel">
      <div className="experience-carousel_wrap">
        <Slider {...settings}>
          {
            items.map((item, i) => (
              <div className="experience-carousel_slick_item" key={i}>
                <ExperienceItem item={item} />
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  );
};

Experience.propTypes = {
  items: PropTypes.array,
};

export default Experience;
 