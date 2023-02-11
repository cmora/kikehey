import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import Hero from '../../Hero/Hero';
import About from '../../About/About';
import Projects from '../../Projects/Projects';
import { camelize } from '../../../utils';
import { pageLoading } from '../../../actions/pageActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleProject = this.onHandleProject.bind(this);
  }

  componentDidMount() {
    const hash = this.getHashFromUrl();
    const { pageLoading } = this.props;
    if (hash) {
      this.navigateToBlock(hash);
    }
    pageLoading(false);
  }

  componentDidUpdate() {
    const hash = this.getHashFromUrl();
    if (hash) {
      this.navigateToBlock(hash);
    }
  }

  navigateToBlock(ref) {
    if(ref) {
      const element = this[ref];
      if (element) {
        setTimeout(() => {
          const top = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: top - 30,
            left: 0,
            behavior: 'smooth',
          });
        }, 500);
      }
    }
  }

  getHashFromUrl() {
    const { hash } = this.props.location;
    return hash.replace('#','');
  }

  onHandleProject({ id, slug, externalUrl }) {
    const { pageLoading, history } = this.props;
    if (externalUrl) {
      window.open(externalUrl, '_blank').focus();
    } else {
      pageLoading(true);
      setTimeout(() => {
        history.push({
          pathname: `/projects/${slug}`,
          state: { projectId: id },
        });
      }, 1000);
    }
  }

  render () {
    const { experience, about, projects } = this.props;
    const projectKeys = Object.keys(projects);
    const aboutImage = get(about, 'image');
    return (
      <div id="main">
        <p>Kike hey</p>
        <Hero image={aboutImage} />
        <div id="container">
          <div ref={(element) => this.about = element}>
            <About {...about} experience={experience} />
          </div>
          {projectKeys && projectKeys.length > 0 &&
            projectKeys.map((key) => {
              const category = get(projects[key][0], 'category.name');
              const categoryDescription = get(projects[key][0], 'category.description');
              const categoryId = camelize(category);
              return (
                <div key={categoryId} ref={(element) => this[categoryId] = element}>
                  <Projects title={category} description={categoryDescription} projects={projects[key]} onHandleProject={this.onHandleProject} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  about: PropTypes.object,
  location: PropTypes.object,
  experience: PropTypes.array,
  projects: PropTypes.array,
  pageLoading: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    about: state.sections['1xZa2s7iXOoOa0s2wQWUOi'],
    experience: state.experience,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageLoading: bindActionCreators(pageLoading, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);