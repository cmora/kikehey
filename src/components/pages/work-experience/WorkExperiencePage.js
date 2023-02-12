import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import Hero from '../../Hero/Hero';
import About from '../../About/About';
import Projects from '../../Projects/Projects';
import { camelize } from '../../../utils';
import { pageLoading, toogleHeader } from '../../../actions/pageActions';

import './WorkExperiencePage.scss';

class WorkExperiencePage extends React.Component {
  constructor(props) {
    super(props);
    // this.onHandleProject = this.onHandleProject.bind(this);
  }

  componentDidMount() {
    // const hash = this.getHashFromUrl();
    // const { pageLoading } = this.props;
    // if (hash) {
    //   this.navigateToBlock(hash);
    // }
    // pageLoading(false);
    const { toogleHeader } = this.props;
    toogleHeader(true);
  }


  componentDidUpdate() {
    // const hash = this.getHashFromUrl();
    // if (hash) {
    //   this.navigateToBlock(hash);
    // }
  }

  // navigateToBlock(ref) {
  //   if(ref) {
  //     const element = this[ref];
  //     if (element) {
  //       setTimeout(() => {
  //         const top = element.getBoundingClientRect().top + window.scrollY;
  //         window.scrollTo({
  //           top: top - 30,
  //           left: 0,
  //           behavior: 'smooth',
  //         });
  //       }, 500);
  //     }
  //   }
  // }

  // getHashFromUrl() {
  //   const { hash } = this.props.location;
  //   return hash.replace('#','');
  // }

  // onHandleProject({ id, slug, externalUrl }) {
  //   const { pageLoading, history } = this.props;
  //   if (externalUrl) {
  //     window.open(externalUrl, '_blank').focus();
  //   } else {
  //     pageLoading(true);
  //     setTimeout(() => {
  //       history.push({
  //         pathname: `/projects/${slug}`,
  //         state: { projectId: id },
  //       });
  //     }, 1000);
  //   }
  // }

  componentWillUnmount() {
    const { pageLoading, toogleHeader } = this.props;
    toogleHeader(false);
    pageLoading(true);
    // window.removeEventListener('scroll', this.handleScroll);
  }

  render () {
    const { experience, about, projects } = this.props;
    const projectKeys = Object.keys(projects);
    const aboutImage = get(about, 'image');
    return (
      <div className="work-experience" id="main">
        {/* <div className="top-block">
          <div className="row">
            <div className="column large-6">
              <Hero image={aboutImage} />
            </div>
            <div className="column large-6">
              <div className="about-container" ref={(element) => this.about = element}>
                <About {...about} experience={experience} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

WorkExperiencePage.propTypes = {
  about: PropTypes.object,
  location: PropTypes.object,
  experience: PropTypes.array,
  projects: PropTypes.array,
  pageLoading: PropTypes.func,
  toogleHeader: PropTypes.func,
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
    toogleHeader: bindActionCreators(toogleHeader, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperiencePage);