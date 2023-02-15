import React, { PropTypes } from 'react';
import CarouselProjects from './CarouselProjects/CarouselProjects';
import CarouselStories from './CarouselStories/CarouselStories';
import GridProjects from './GridProjects/GridProjects';
const iconGrid = require('../../assets/images/icon-grid.svg');
const iconCarousel = require('../../assets/images/icon-carousel.svg');

import './Projects.scss';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.changeFlavor = this.changeFlavor.bind(this);
    this.state = {
      flavor: 'grid',
    };
  }

  changeFlavor (flavor) {
    this.setState({ flavor });
  }

  render () {
    const { flavor } = this.state;
    const {
      description,
      title,
      projects,
      onHandleProject,
      categoryId,
    } = this.props;

    const isCarouselStories = categoryId === 'designStories';

    return (
      <div className="projects-block content-block">
        <div className="row">
          <div className="column">
            <h2 className="projects-block_title content-block__title">
              {title}
            </h2>
            {!isCarouselStories && (
              <div className={`content-block__icon ${flavor}`} >
                <div className="icon-grid" onClick={() => this.changeFlavor('grid')}>
                  <img src={iconGrid} />
                </div>
                <div className="icon-carousel" onClick={() => this.changeFlavor('carousel')}>
                  <img src={iconCarousel} />
                </div>
              </div>
            )}
            <p className="content-block__description">
              {description}
            </p>
            {isCarouselStories ? (
              <CarouselStories items={projects} onHandleProject={onHandleProject} />
            ) : (
              <div>
                {flavor === 'carousel' || isCarouselStories && (
                  <CarouselProjects items={projects} onHandleProject={onHandleProject} />
                )}
                {flavor === 'grid' && !isCarouselStories && (
                  <GridProjects items={projects} onHandleProject={onHandleProject} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  projects: PropTypes.array,
  onHandleProject: PropTypes.func,
};

export default Projects;
