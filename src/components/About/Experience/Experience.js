import React, { PropTypes } from 'react';
import Slider from "react-slick";

import ExperienceItem from './ExperienceItem';
import './Experience.scss';


const Experience = ({
  items,
}) => {
  if (!items || !items.length) return null;

  return (
    <div className="experience-block">
      {items.map((item, i) => (
        <ExperienceItem key={i} item={item} />
      ))}
    </div>
  );
};

Experience.propTypes = {
  items: PropTypes.array,
};

export default Experience;
