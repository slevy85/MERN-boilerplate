import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

const App = ({ children }) => (
  <div className="container">
    <Header />

    <main>
      {children}
    </main>

    <br />
  </div>
);

App.defaultProps = {
  children: '',
};
App.propTypes = {
  children: PropTypes.node,
};

export default App;
