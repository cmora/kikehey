import React, { PropTypes } from 'react';
import Slider from "react-slick";
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';

import ProjectItem from '../ProjectItem/ProjectItem';
import './CarouselProjects.scss';


const CarouselProjects = ({
  items,
  onHandleProject
}) => {
  if (!items || !items.length) return null;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    verticalSwiping: false
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          verticalSwiping: false
        }
      }
    ]
  };

  const isSlick = (!isMobile && items.length >= 4) || isMobile;

  return (
    <div className="projects-carousel">
      <div className="projects-carousel_wrap">
        {isSlick ? (
          <Slider {...settings}>
            {
              items.map((item, i) => (
                <div className="projects-carousel_slick_item" key={i}>
                  <ProjectItem item={item} flavor="carousel" onHandleProject={onHandleProject} />
                </div>
              ))
            }
          </Slider>
        ) : (
          <div className={classnames(
            {
              ['noSlick']: !isSlick
            }
          )}>
            {
              items.map((item, i) => (
                <div className="projects-carousel_noslick_item" key={i}>
                  <ProjectItem item={item} flavor="carousel" onHandleProject={onHandleProject} />
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

CarouselProjects.propTypes = {
  items: PropTypes.array
};

export default CarouselProjects;
 