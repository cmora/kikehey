import React, { PropTypes } from 'react';
import { Helmet } from "react-helmet";
import WOW from "wow.js";
import Favicon from 'react-favicon';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Contact from './Contact/Contact';
import Loader from './Loader/Loader';
import { getMetaTags } from '../utils';
import meta, { SITE_URL } from '../config';
const ICON = require('../assets/images/favicon.png');

class App extends React.Component {
  componentDidMount() {
    const wow = new WOW();
    wow.init();
  }

  render () {
    const { loaded, loading, children } = this.props;
    if (meta) {
      window.prerenderReady = true;
    }

    return (
      <div id="wrapper">
        <Helmet
          htmlAttributes={{
            itemscope: undefined,
            itemtype: 'http://schema.org/WebPage',
          }}
          title={meta.title}
          link={[
            {
              rel: 'canonical',
              href: SITE_URL,
            },
          ]}
          meta={getMetaTags(this.props, '/')}
        />
        <Favicon url={ICON} />
        <Header />
        <Loader loading={loading} loaded={loaded} />
        <Contact />
        {children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  pageLoading: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    loading: state.page.loading,
    loaded: state.page.loaded,
  };
};

export default connect(mapStateToProps)(App);
