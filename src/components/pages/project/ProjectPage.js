import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { get, has } from 'lodash';
import { loadProject, cleanProject } from '../../../actions/projectActions';
import { pageLoading } from '../../../actions/pageActions';

import './ProjectPage.scss';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props); 
    this.handleScroll = this.handleScroll.bind(this);
    this.handleBack = this.handleBack.bind(this);
    
    this.state = {
      headerPosition: 'translate3d(-50%, 0, 0)',
      arrowPosition: 'translate3d(0, 0, 0)',
      opacity: 0,
      sticky: false,
      headHeight: 0
    };

    const { location, loadProject, history } = this.props;
    const projectId = get(location, 'state.projectId');
    if (projectId) {
      loadProject(projectId);
    } else {
      history.push({ pathname: '/404' });
    }
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
    this.props.pageLoading(true);
    this.props.cleanProject();
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

  handleBack() {
    this.props.pageLoading(true);
    setTimeout(() => {
      this.props.history.push({ pathname: `/` });
    }, 1000);
  }
  
  render () {
    const { project } = this.props;
    if (project && has(project, 'title') ) {
      this.props.pageLoading(false);
    }

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
        },
        [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content).replace('\n', '<br/>')}</p>`,
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
            style={{
              backgroundImage: !isMobile ? `url(${image})` : null,
            }}
          >
            <img
              src={image}
              style={{ transform: headerPosition }}
            />
          </div>
          <div className="project-page_header__overlay" style={{ opacity: opacity }} />
          <div className="project-page_header__arrow" style={{ opacity: opacity, transform: arrowPosition }} />
          <div className="project-page_header__close" onClick={this.handleBack} />
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
                {url &&
                  <div className="project-page_body_link">
                    <a href={url} target="_blank">See the online project here!</a>
                  </div>
                }
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
  return {
    project: state.project
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProject: bindActionCreators(loadProject, dispatch),
    pageLoading: bindActionCreators(pageLoading, dispatch),
    cleanProject: bindActionCreators(cleanProject, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);


