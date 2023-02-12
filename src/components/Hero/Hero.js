import React, { PropTypes } from 'react';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo/Logo';

import './Hero.scss';

const imageBakground = require('../../assets/images/kb-profile-image.png');

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      backgroundPosition: 'translate3d(0, 0, 0)',
      logoPosition: 'translate3d(0, 0, 0)',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const velocityBG = 0.4;
    const velocityLogo = 0.2;
    const scrollTop = window.scrollY;
    if (isMobile) {
      this.setState({
        logoPosition: `translate3d(0, -${Math.round((scrollTop) * velocityLogo)}px, 0)`,
      });
    } else {
      this.setState({
        backgroundPosition: `translate3d(0, ${Math.round((scrollTop) * velocityBG)}px, 0)`,
        logoPosition: `translate3d(0, ${Math.round((scrollTop) * velocityLogo)}px, 0)`,
      });
    }
  }

  render() {
    const { image } = this.props;
    const { backgroundPosition, logoPosition } = this.state;

    return (
      <div
        className="hero-intro"
        style={{ backgroundPosition }}
      >
        <div className="hero-intro_image">
          <img
            className="hero-intro_img"
            src={imageBakground}
            style={{ transform: backgroundPosition }}
          />
          <div className="logo-container" style={{ transform: logoPosition }}>
            <Logo />
          </div>
        </div>
        <span className="hero-intro_mouse">
          <span className="hero-intro_mouse__wheel" />
        </span>
        <span className="hero-intro_arrow" />
      </div>
    );
  }
}

Hero.propTypes = {
  image: PropTypes.string,
};

export default Hero;
