import React, { PropTypes } from 'react';
import { get } from 'lodash';
import './Social.scss';


const Social = ({
  items,
}) => {
  if (!items || !items.length) return null;

  return (
    <div className="social-networks">
      {items.map((item) => {
        const name = get(item, 'name').toLowerCase();
        return (
          <div key={name} className="social-networks_item">
            <a  className="social-networks_item_facebook" href={get(item, 'url')}>
              <i className={`fab fa-${name}${name === 'facebook' ? '-f' : ''}`}></i>
            </a>
          </div>
        );
      })}
    </div>
  );
};

Social.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Social;
 