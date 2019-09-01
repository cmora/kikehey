import React, { PropTypes } from 'react';
import { isMobile } from 'react-device-detect';

const logo = require('../../assets/images/logo.svg');
const bg = require('../../assets/images/img-about.png');
import './Hero.scss';

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
    const velocityBG = 0.5;
    const velocityLogo = 0.3;
    const scrollTop = window.scrollY;
    if (isMobile) {
      this.setState({
        logoPosition: `translate3d(0, ${Math.round((scrollTop) * velocityLogo)}px, 0)`,
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
            src={image}
            style={{ transform: backgroundPosition }}
          />
          <img
            src={logo}
            style={{ transform: logoPosition }}
          />
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
 