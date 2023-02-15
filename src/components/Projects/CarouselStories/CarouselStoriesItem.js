import React, { PropTypes } from 'react';
import Slider from "react-slick";
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';

import ProjectItem from '../ProjectItem/ProjectItem';
import './CarouselStoriesItem.scss';


const CarouselStoriesItem = ({
  item,
  onHandleProject,
}) => {

  const onPressHanlder = () => {
    onHandleProject(item);
  };

  return (
    <div onClick={onPressHanlder} className="carousel-story-item">
      <div className="carousel-story-item_wrap">
        <div className="carousel-story-item_media">
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="carousel-story-item_text">
          <p>{item.title}</p>
        </div>
      </div>
    </div>
  );
};

CarouselStoriesItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
  }),
  onHandleProject: PropTypes.func,
};

export default CarouselStoriesItem;
