import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import Hero from '../../Hero/Hero';
import About from '../../About/About';
import Projects from '../../Projects/Projects';
import camelize from '../../../utils';
import { pageLoading } from '../../../actions/pageActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleProject = this.onHandleProject.bind(this);
  }

  componentDidMount() {
    const hash = this.getHashFromUrl();
    if (hash) {
      this.navigateToBlock(hash);
    }
    this.props.pageLoading(false);
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
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: top - 30,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }

  getHashFromUrl() {
    const { hash } = this.props.location;
    return hash.replace('#','');
  }

  onHandleProject(item) {
    this.props.pageLoading(true);
    setTimeout(() => {
      this.props.history.push({
        pathname: `/projects/${item.slug}`,
        state: { projectId: item.id }
      });
    }, 1000);
  }

  render () {
    const { experience, sections, projects } = this.props;
    const projectKeys = Object.keys(projects);
    return (
      <div id="main">
        <Hero />
        <div id="container">
          <div ref={(element) => this.about = element}>
            <About {...sections[0]} experience={experience} />
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
  sections: PropTypes.array,
  location: PropTypes.object,
  experience: PropTypes.array,
  projects: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
    experience: state.experience,
    projects: state.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageLoading: bindActionCreators(pageLoading, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);