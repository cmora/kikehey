import React, { PropTypes } from 'react';
import Experience from './Experience/Experience';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import './About.scss';
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
        <h2 className="about-block_title content-block__title animated fadeInUp">
          {title}
        </h2>
        <div className="content-block__description animated fadeInUp">
        {body &&
          /* eslint-disable react/no-danger */
          <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}} />
        }
        </div>
        <Experience items={experience} />
        {resume &&
          <div className="about-block_resume">
            <a href={resume} target="_blank">
              DOWNLOAD MY FULL RESUME
              <img src={downloadIcon} />
            </a>
          </div>
        }
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
 