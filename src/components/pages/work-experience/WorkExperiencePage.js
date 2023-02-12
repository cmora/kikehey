import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { get } from 'lodash';
import Hero from '../../Hero/Hero';
import About from '../../About/About';
import Projects from '../../Projects/Projects';
import { camelize } from '../../../utils';
import { pageLoading, toogleHeader } from '../../../actions/pageActions';

import './WorkExperiencePage.scss';
import Experience from '../../About/Experience/Experience';

class WorkExperiencePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    // const hash = this.getHashFromUrl();
    // const { pageLoading } = this.props;
    // if (hash) {
    //   this.navigateToBlock(hash);
    // }
    // pageLoading(false);
    const { toogleHeader, pageLoading } = this.props;
    toogleHeader(true);
    pageLoading(false);
  }


  componentDidUpdate() {
    // const hash = this.getHashFromUrl();
    // if (hash) {
    //   this.navigateToBlock(hash);
    // }
  }

  componentWillUnmount() {
    const { pageLoading, toogleHeader } = this.props;
    toogleHeader(false);
    pageLoading(true);
  }

  handleBack() {
    const { pageLoading, history } = this.props;
    pageLoading(true);
    setTimeout(() => {
      history.push({
        pathname: '/',
      });
    }, 1000);
  }

  render () {
    const { experience } = this.props;

    return (
      <div className="work-experience" id="main">
        <div
          className="close-button"
          onClick={this.handleBack}
        />
        <div className="row">
          <div className="column">
            <div className="work-experience_container">
              <h1 className="page-title">Work experience</h1>
              <Experience items={experience} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkExperiencePage.propTypes = {
  experience: PropTypes.array,
  pageLoading: PropTypes.func,
  toogleHeader: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    experience: state.experience,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageLoading: bindActionCreators(pageLoading, dispatch),
    toogleHeader: bindActionCreators(toogleHeader, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperiencePage);