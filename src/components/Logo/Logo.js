import React from 'react';

import './Logo.scss';

const logo = require('../../assets/images/logo.svg');

const Logo = (props) => {
  return (
    <div className="logo" {...props}>
      <img
        src={logo}
        className="logo_image"
      />
      <h2 className="logo_title">
        Kike Peña <br />
        Product Design
      </h2>
    </div>
  );
};

export default Logo;
