import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Contact from './Contact/Contact';
import Loader from './Loader/Loader';

class App extends React.Component {
  render () {
    const { loaded, loading, children } = this.props;
    return (
      <div id="wrapper">
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
