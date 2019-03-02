import React, { PropTypes } from 'react';
import classnames from 'classnames';

import './Loader.scss';

const Loader = ({
  loading
}) => {
  return (
    <div
      className={classnames(
        'loader',
        {
          ['loading']: loading
        }
      )}
    >
      <div className="circle-first"></div>
      <div className="circle-second"></div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool
};


export default Loader;
 