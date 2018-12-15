import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './ProjectItem.scss';


const ProjectItem = ({
  item,
  flavor,
  onHandleProject
}) => {
  if (!item) return null;
  
  return (
    <div className={`project-item ${flavor}`}>
      <Link
        to={{
          pathname: `/projects/${item.slug}`,
          state: { projectId: item.id }
        }}
        className="project-item_content"
        onClick={onHandleProject}
      >
        <div className="project-item_image">
          <img src={item.thumbnail} />
          <div className="project-item_overlay">
            {flavor === 'carousel' &&
              <div className="project-item_button">
                OPEN PROJECT
              </div>
            }
          </div>
        </div>
        {flavor === 'carousel' &&
          <h5 className="project-item_title">
            {item.title}
          </h5>
        }
      </Link> 
    </div>
  );
};

ProjectItem.propTypes = {
  item: PropTypes.object,
  flavor: PropTypes.string
};

ProjectItem.defaultProps = {
  flavor: "carousel"
};

export default ProjectItem;
 