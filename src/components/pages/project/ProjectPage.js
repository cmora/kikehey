import React, { PropTypes } from 'react';
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { get, has } from 'lodash';
import { loadProject, cleanProject } from '../../../actions/projectActions';
import { loadProjects } from '../../../actions/projectsActions';
import { pageLoading, toogleHeader } from '../../../actions/pageActions';
import { camelize, getProjectIDbySlug, getMetaTags } from '../../../utils/';
import { SITE_URL } from '../../../config';

import './ProjectPage.scss';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.scrollPos = 0;

    this.state = {
      headerPosition: 'translate3d(0, 0, 0)',
      opacity: 0,
      sticky: false,
      headHeight: 0,
      closeButtonVisible: true,
    };

    const { location, loadProject } = this.props;
    const projectId = get(location, 'state.projectId');
    if (projectId) {
      loadProject(projectId);
    } else {
      loadProjects();
    }
  }

  componentDidMount() {
    const { toogleHeader } = this.props;
    toogleHeader(true);
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
    if (this.projectHead) {
      this.detectHeaderheight();
    }
  }

  componentDidUpdate(prevProps) {
    const { projects, location, loadProject, history } = this.props;
    if (projects && (projects !== prevProps.projects)) {
      const { pathname } = location;
      const slug = pathname.replace('/projects/', '');
      const projectID = getProjectIDbySlug(projects, slug);
      if (projectID) {
        loadProject(projectID);
      } else {
        history.push({ pathname: '/404' });
      }
    }
  }

  componentWillUnmount() {
    const { pageLoading, cleanProject, toogleHeader } = this.props;
    toogleHeader(false);
    pageLoading(true);
    cleanProject();
    window.removeEventListener('scroll', this.handleScroll);
  }

  detectHeaderheight() {
    const { clientHeight } = this.projectHead;
    this.setState({ headHeight: clientHeight });
  }

  handleScroll() {
    const { headerPosition, opacity, closeButtonVisible } = this.state;
    const velocityBG = 0.6;
    const scrollPos = window.scrollY;
    if (scrollPos > this.scrollPos){
      if (closeButtonVisible) {
        this.setState({ closeButtonVisible: false });
      }
    } else {
      if (!closeButtonVisible) {
        this.setState({ closeButtonVisible: true });
      }
    }
    this.scrollPos = scrollPos < 0 ? 0 : scrollPos;

    const offet = isMobile ? 275 : 500;
    if (this.scrollPos <= offet) {
      const opacityOffset = (this.scrollPos * 1) / offet;
      this.setState({
        headerPosition: `translate3d(0, ${Math.round((this.scrollPos) * velocityBG)}px, 0)`,
        opacity: opacityOffset,
      });
    } else {
      this.setState({
        headerPosition: `translate3d(0, ${headerPosition}px, 0)`,
        opacity,
      });
    }
  }

  handleBack() {
    const { pageLoading, history, project } = this.props;
    const category = get(project, 'category.name');
    const categoryId = camelize(category);
    pageLoading(true);
    setTimeout(() => {
      history.push({
        pathname: '/',
        hash: `#${categoryId}`,
      });
    }, 1000);
  }


  render () {
    const { project, pageLoading, location } = this.props;
    if (project && has(project, 'title') ) {
      pageLoading(false);
    }

    const {
      headerPosition,
      opacity,
      sticky,
      headHeight,
      closeButtonVisible,
    } = this.state;
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
          return `
            <div class="embedded-media">
              <img src="${asset}" />
            </div>
          `;
        },
        [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content).replace('\n', '<br/>')}</p>`,
      },
    };

    const meta = {
      title: title,
      description: title,
      image,
    };

    return (
      <div>
        <Helmet
          htmlAttributes={{
            itemscope: undefined,
            itemtype: 'http://schema.org/WebPage',
          }}
          title={title}
          link={[
            {
              rel: 'canonical',
              href: SITE_URL,
            },
          ]}
          meta={getMetaTags(meta, location.pathname)}
        />
        <div className={classnames(
          'project-page',
          {
            ['sticky']: sticky,
          }
        )}>
          <header className="project-page_header">
            <div
              className="project-page_header__image"
              style={{
                backgroundImage: `url(${image})`,
                transform: headerPosition,
              }}
            />
            <div className="project-page_header__overlay" style={{ opacity: opacity }} />
            <div
              className={classnames(
                'project-page_header__close',
                {
                  ['button-visible']: closeButtonVisible,
                  ['button-hidden']: !closeButtonVisible,
                }
              )}
              onClick={this.handleBack}
            />
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
                      /* eslint-disable react/no-danger */
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
      </div>
    );
  }
}

ProjectPage.propTypes = {
  project: PropTypes.object.isRequired,
  location: PropTypes.object,
  loadProject: PropTypes.func,
  pageLoading: PropTypes.func,
  cleanProject: PropTypes.func,
  toogleHeader: PropTypes.func,
  projects: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    project: state.project,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProject: bindActionCreators(loadProject, dispatch),
    pageLoading: bindActionCreators(pageLoading, dispatch),
    cleanProject: bindActionCreators(cleanProject, dispatch),
    toogleHeader: bindActionCreators(toogleHeader, dispatch),
    loadProjects: bindActionCreators(loadProjects, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
