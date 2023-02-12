import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Menu from '../Menu/Menu';
import { pageLoading } from '../../actions/pageActions';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      open: false,
      prevScrollpos: window.pageYOffset,
      visible: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { visible, open } = this.state;
    const { headerHidden } = this.props;
    return (
      nextState.visible !== visible ||
      nextState.open !== open ||
      nextProps.headerHidden !== headerHidden
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    if (prevScrollpos >= 0) {
      this.setState({
        visible,
      });
    }
    this.setState({
      prevScrollpos: currentScrollPos,
    });
  }

  handleOpen() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }


  handleNavigation(toTop, path) {
    if (path) {
      const { pageLoading } = this.props;
      pageLoading(true);
      setTimeout(() => {
        browserHistory.push({
          pathname: path,
        });
      }, 1000);
      this.handleOpen();
      return;
    }
    setTimeout(() => {
      const { open } = this.state;
      this.setState({
        open: !open,
      });
      if (toTop) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 300);
  }

  render () {
    const { open, visible } = this.state;
    const { social, projects, headerHidden } = this.props;

    if (headerHidden) return null;

    return (
      <header
        id="header"
        className={classnames(
          'header',
          {
            ['open']: open,
            "hidden": isMobile && (!visible && !open),
          }
        )}
      >
        <div className="open-menu" onClick={this.handleOpen}>
          <span />
          <span />
          <span />
        </div>
        <Menu
          open={open}
          handleOpen={this.handleOpen}
          handleNavigation={this.handleNavigation}
          projects={projects}
          socialNetworks={social}
        />
      </header>
    );
  }
}

Header.propTypes = {
  projects: PropTypes.array.isRequired,
  social: PropTypes.array.isRequired,
  headerHidden: PropTypes.bool,
  pageLoading: PropTypes.boo,
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageLoading: bindActionCreators(pageLoading, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    social: state.social,
    headerHidden: state.page.headerHidden,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);