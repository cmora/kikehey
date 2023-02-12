import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import { Link } from 'react-router';
import Social from '../utils/Social/Social';
import { camelize } from '../../utils';

import './Menu.scss';

const Menu = ({
  open,
  handleOpen,
  handleNavigation,
  projects,
  socialNetworks,
}) => {
  if (!projects || !projects.length) return null;

  return (
    <nav className="main-menu">
      <div
        className={classnames(
          'main-menu_top',
          {
            ['animated fadeInDown']: open,
          }
        )}
      >
        <div className="close-menu" onClick={handleOpen} />
      </div>
      <div className="main-menu_list">
        <ul
          className={classnames(
            'main-menu__nav',
            {
              ['animated fadeInUp']: open,
            }
          )}
        >
          <li>
            <Link
              to={{
                pathname: "/",
                hash: '#about',
              }}
              onClick={() => handleNavigation(false)}
            >
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/work-experience",
              }}
              onClick={() => handleNavigation(false)}
            >
              <span>Work experience</span>
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
                    hash: `#${categoryId}`,
                  }}
                  onClick={() => handleNavigation(false)}
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
            ['animated fadeInUp']: open,
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
  socialNetworks: PropTypes.array,
};

export default Menu;
