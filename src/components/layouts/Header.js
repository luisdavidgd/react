import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

Header.defaultProps = {
  title: 'Default App Title'
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;