import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Social from '../utils/Social/Social';

import './Footer.scss';

const Footer = ({
  social
}) => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="column">
          <p>If you want to work with me, just shoot me an email <a href="mailto:me.@kikehey.com">me.@kikehey.com</a> or find me here:</p>
          <Social items={social} />
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  social: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    social: state.social
  };  
};

export default connect(mapStateToProps)(Footer);
 