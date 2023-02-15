import React, { PropTypes } from 'react';
import Slider from "react-slick";
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';

import ProjectItem from '../ProjectItem/ProjectItem';
import './CarouselStories.scss';
import CarouselStoriesItem from './CarouselStoriesItem';


function groupArr(data, n) {
  let group = [];

  for (let i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0) j++;
    group[j] = group[j] || [];
    group[j].push(data[i]);
  }

  return group;
}

const CarouselStories = ({
  items,
  onHandleProject,
}) => {
  if (!items || !items.length) return null;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    verticalSwiping: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          verticalSwiping: false,
        },
      },
    ],
  };

  const getItems = () => {
    return groupArr(items, isMobile ? 1 : 2);
  };

  return (
    <div className="carousel-stories">
      <div className="carousel-stories_wrap">
        <Slider {...settings}>
          {
            getItems().map((group, i) => {
              const key = `group-${i}`;
              return (
                <div key={key} className="carousel-group-item">
                  {group.map((item, j) => (
                    <CarouselStoriesItem key={item.id} item={item} onHandleProject={onHandleProject} />
                  ))}
                </div>
              );
            })
          }
        </Slider>
      </div>
    </div>
  );
};

CarouselStories.propTypes = {
  items: PropTypes.array,
  onHandleProject: PropTypes.func,
};

export default CarouselStories;
