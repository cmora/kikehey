import React, { PropTypes } from 'react';
import Experience from './Experience/Experience';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import './About.scss';
import Logo from '../Logo/Logo';

const downloadIcon = require('../../assets/images/download.svg');

const About = ({
  title,
  body,
  resume,
  experience,
}) => (
  <div className="about-block content-block">
    <div className="row">
      <div className="column">
        <div className="logo-container">
          <Logo />
        </div>
        {body &&
          /* eslint-disable react/no-danger */
          <div className="content-block__description" dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}} />
        }
        {/* <Experience items={experience} />
        {resume &&
          <div className="about-block_resume">
            <a href={resume} target="_blank">
              DOWNLOAD MY FULL RESUME
              <img src={downloadIcon} />
            </a>
          </div>
        } */}
      </div>
    </div>
  </div>
);

About.propTypes = {
  title: PropTypes.string,
  resume: PropTypes.string,
  experience: PropTypes.array,
  body: PropTypes.object,
};

export default About;
