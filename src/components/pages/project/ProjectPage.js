import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { get } from 'lodash';
import { loadProject } from '../../../actions/projectActions';

import './ProjectPage.scss';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props); 
    this.handleScroll = this.handleScroll.bind(this);
    
    this.state = {
      headerPosition: 'translate3d(-50%, 0, 0)',
      arrowPosition: 'translate3d(0, 0, 0)',
      opacity: 0,
      sticky: false,
      headHeight: 0
    };

    const { projectId } = this.props.location.state;
    this.props.loadProject(projectId);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (isMobile) {
      window.addEventListener('scroll', this.handleScroll);
      if (this.projectHead) {
        const headHeight = this.projectHead.clientHeight;
        this.setState({ headHeight });
      }
    }
  }

  componentWillUnmount() {
    if (isMobile) {
      window.removeEventListener('scroll', this.handleScroll); 
    }
  }

  handleScroll() {
    const velocityBG = 0.2;
    const velocityArrow = 0.4;
    const scrollTop = window.scrollY;
    const offet = 275;
    if (scrollTop <= offet) {
      const opacityOffset = (scrollTop * 1) / offet;
      this.setState({
        headerPosition: `translate3d(-50%, ${Math.round((scrollTop) * -velocityBG)}px, 0)`,
        arrowPosition: `translate3d(0, ${Math.round((scrollTop) * velocityArrow)}px, 0)`,
        sticky: false,
        opacity: opacityOffset
      });
    } else {
      this.setState({
        headerPosition: `translate3d(-50%, ${this.state.headerPosition}px, 0)`,
        opacity: this.state.opacity,
        sticky: true
      });
    }
  }
  
  render () {
    const { project } = this.props;
    
    const { headerPosition, opacity, sticky, headHeight, arrowPosition } = this.state;
    const title = get(project, 'title', null);
    const body = get(project, 'body', null);
    const image = get(project, 'image', null);
    const company = get(project, 'company', null);
    const url = get(project, 'url', null);
    

    const htmlOptions = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const asset = get(node, 'data.target.fields.file.url');
          if (!asset) return null;
          return `<img src="${asset}" />`;
        }
      }
    };

    return (
      <div className={classnames(
        'project-page',
        {
          ['sticky']: sticky
        }
      )}>
        <header className="project-page_header">
          <div
            className="project-page_header__image"
            style={{backgroundImage: `url(${image})`}}
          >
            <img
              src={image}
              style={{ transform: headerPosition }}
            />
          </div>
          <div className="project-page_header__overlay" style={{ opacity: opacity }} />
          <div className="project-page_header__arrow" style={{ opacity: opacity, transform: arrowPosition }} />
        </header>
        <div className="row">
          <div className="column">
            <div
              className="project-page_project__head"
              ref={(element) => this.projectHead = element}
            >
              <h1 className="project-page_body__title">{title}</h1>
            </div>
          </div>
        </div>
        <main className="project-page_content">
          <div className="row">
            <div className="column">
              <div className="project-page_body">
                <div className="project-page_fake-head" style={{ height: headHeight }} />
                <div className="project-page_body__content">
                  <div className="project-page_body__company">{company}</div>
                  {body &&
                    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body, htmlOptions)}} />
                  }
                </div>
                <div className="project-page_body_link">
                  <a href={url} target="_blank">See the online project here!</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

ProjectPage.propTypes = {
  project: PropTypes.object.isRequired,
  location: PropTypes.object,
  loadProject: PropTypes.func
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    project: state.project
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProject: bindActionCreators(loadProject, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);


