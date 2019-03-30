import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <header className="App-title" >
    <h1>{props.title}</h1>
  </header>
);

Header.defaultProps = {
  title: 'Default App Title'
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;