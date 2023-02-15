import React, { PropTypes } from 'react';
import { isMobile } from 'react-device-detect';
import './ProjectItem.scss';


const ProjectItem = ({
  item,
  flavor,
  onHandleProject,
}) => {
  if (!item) return null;

  const onPressHandler = () => {
    if (onHandleProject) {
      onHandleProject(item);
    }
  };

  return (
    <div className={`project-item wow fadeInUp ${flavor} ${isMobile ? `${flavor}-mobile` : null}`}>
      <div
        className="project-item_content"
        onClick={onPressHandler}
      >
        <div className="project-item_image">
          <img src={item.thumbnail} />
          <div className="project-item_overlay">
            {!isMobile && (
              <div className="project-item_button">
                OPEN PROJECT
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  item: PropTypes.object,
  flavor: PropTypes.string,
  onHandleProject: PropTypes.func,
};

ProjectItem.defaultProps = {
  flavor: "carousel",
};

export default ProjectItem;
