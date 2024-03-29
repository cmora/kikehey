import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Social from '../utils/Social/Social';

import './Footer.scss';

const Footer = ({
  social,
  footer,
}) => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="column">
          <div className="footer-containter">
            {footer && footer.body &&
              /* eslint-disable react/no-danger */
              <div className="footer-text" dangerouslySetInnerHTML={{__html: documentToHtmlString(footer.body)}} />
            }
            <Social items={social} />
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  social: PropTypes.array.isRequired,
  footer: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    social: state.social,
    footer: state.sections['4mqxb8OMOopPLVyU1F1Ojq'],
  };
};

export default connect(mapStateToProps)(Footer);
