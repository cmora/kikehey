import React, { PropTypes } from 'react';
import './ExperienceItem.scss';


const ExperienceItem = ({
  item,
}) => {
  if (!item) return null;

  return (
    <div className="experience-item">
      {item.companyLogo &&
        <div className="experience-item_logo">
          <img src={item.companyLogo} />
        </div>
      }
      <div className="experience-item_role">
        {item.role}
      </div>
      <div className="experience-item_date">
        ( {item.startDate} - {item.endDate ? item.endDate : 'Actual'} )
      </div>
      {/* <h5 className="experience-item_company">
        {item.company}
      </h5> */}
      <div className="experience-item_description">
        {item.description}
      </div>
    </div>
  );
};

ExperienceItem.propTypes = {
  item: PropTypes.object,
};

export default ExperienceItem;
