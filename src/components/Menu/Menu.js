import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import { Link } from 'react-router';
import Social from '../utils/Social/Social';
import camelize from '../../utils';

const logo = require('../../assets/images/icon-logo.svg');
import './Menu.scss';

const Menu = ({
  open,
  handleOpen,
  handleNavigation,
  projects,
  socialNetworks
}) => {
  if (!projects || !projects.length) return null;

  return (
    <nav className="main-menu">
      <div
        className={classnames(
          'main-menu_top',
          {
            ['animated fadeInDown']: open
          }
        )}
      >
        <div className="main-menu_top__logo">
          <Link to="/" onClick={handleNavigation}>
            <img src={logo} />
          </Link>
        </div>
        <div className="close-menu" onClick={handleOpen} />
      </div>
      <div className="main-menu_list">
        <ul
          className={classnames(
            'main-menu__nav',
            {
              ['animated fadeInUp']: open
            }
          )}
        >
          <li>
            <Link
              to={{
                pathname: "/",
                hash: '#about'
              }}
              onClick={handleNavigation}
            >
              <span>About</span>
            </Link>
          </li>
          {projects.map((el, i) => {
            const category = get(el[0], 'category.name');
            const categoryId = camelize(category);
            return (
              <li key={categoryId}>
                <Link
                  to={{
                    pathname: "/",
                    hash: `#${categoryId}`
                  }}
                  onClick={handleNavigation}
                >
                  <span>{category}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={classnames(
          {
            ['animated fadeInUp']: open
          }
        )}
      >
        <Social items={socialNetworks} />
      </div>
    </nav>
  );
};

Menu.propTypes = {
  projects: PropTypes.array,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleNavigation: PropTypes.func,
  socialNetworks: PropTypes.array
};

export default Menu;
 