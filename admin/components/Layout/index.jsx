import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// styles
import '../../static/scss/black-dashboard-react.scss';

// core components
import AdminNavbar from '../Navbars/AdminNavbar.jsx';
import Footer from '../Footer/Footer.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import logo from '../../static/img/react-logo.png';

// importing routes from an external file.
import routes from '../../variables/routes';

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      sidebarOpened: false,
      // document.documentElement.className.indexOf('nav-open') !== -1,
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    // console.log(e); // todo figure out what this function is supposed to do,
    // if (e.history.action === 'PUSH') {
    //   if (navigator.platform.indexOf('Win') > -1) {
    //     let tables = document.querySelectorAll('.table-responsive');
    //     for (let i = 0; i < tables.length; i++) {
    //       ps = new PerfectScrollbar(tables[i]);
    //     }
    //   }
    //   document.documentElement.scrollTop = 0;
    //   document.scrollingElement.scrollTop = 0;
    //   this.refs.mainPanel.scrollTop = 0;
    // }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    const routes = path.split('/');
    return routes[routes.length - 1];
  };
  render() {
    return (
      <React.Fragment>
        <div className='wrapper'>
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: '/admin',
              text: 'Comikart',
              imgSrc: logo,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className='main-panel'
            ref='mainPanel'
            data={this.state.backgroundColor}
          >
            {/* brandText={this.getBrandText(this.props.location.pathname)} brandText={this.getBrandText(this.props.location.pathname)} todo get location property with next router */}
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.router.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            {this.props.children}
            {/* <Switch>{this.getRoutes(routes)}</Switch> */}
            {/* we don't want the Footer to be rendered on map page*/}
            {/* this.props.location.pathname.indexOf('maps') !== -1 ? null : ( //todo fix this ternary with next router.*/}
            <Footer fluid />
            {/* )}*/}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Admin);
