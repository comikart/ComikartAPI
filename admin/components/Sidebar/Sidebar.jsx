/*eslint-disable*/
import React from 'react';

import Link from 'next/link';
import { withRouter } from 'next/router';

// nodejs library to set properties for components
import { PropTypes } from 'prop-types';

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// reactstrap components
import { Nav } from 'reactstrap';

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.router.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove('nav-open');
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <Link href={logo.outterLink}>
            <a
              href='#'
              className='simple-text logo-mini'
              onClick={this.props.toggleSidebar}
            >
              <div className='logo-img'>
                <img src={logo.imgSrc} alt='react-logo' />
              </div>
            </a>
          </Link>
        );
        logoText = (
          <Link href={logo.outterLink}>
            <a
              href='#'
              className='simple-text logo-normal'
              onClick={this.props.toggleSidebar}
            >
              {logo.text}
            </a>
          </Link>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className='simple-text logo-mini'
            onClick={this.props.toggleSidebar}
          >
            <div className='logo-img'>
              <img src={logo.imgSrc} alt='react-logo' />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className='simple-text logo-normal'
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }
    return (
      <div className='sidebar' data={bgColor}>
        <div className='sidebar-wrapper' ref='sidebar'>
          {logoImg !== null || logoText !== null ? (
            <div className='logo'>
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? ' active-pro' : '')
                  }
                  key={prop + key}
                >
                  <Link href={prop.path}>
                    <a
                      href='#'
                      className='nav-link'
                      activeClassName='active'
                      onClick={this.props.toggleSidebar}
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: 'primary',
  routes: [{}],
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(['primary', 'blue', 'green']),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default withRouter(Sidebar);
