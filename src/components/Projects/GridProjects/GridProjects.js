import React, { PropTypes } from 'react';

import ProjectItem from '../ProjectItem/ProjectItem';
import './GridProjects.scss';


const GridProjects = ({
  items,
  onHandleProject,
}) => {
  if (!items || !items.length) return null;

  return (
    <div className="projects-grid">
      <div className="projects-grid_wrap">
        <ul className="projects-grid_list">
          {
            items.map((item, i) => (
              <div className="projects-grid_item" key={i}>
                <ProjectItem item={item} flavor="grid" onHandleProject={onHandleProject} />
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

GridProjects.propTypes = {
  items: PropTypes.array,
  onHandleProject: PropTypes.func,
};

export default GridProjects;
 