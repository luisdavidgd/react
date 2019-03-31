import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Clicker extends Component {

  constructor(props) {
    super();

    this.state = {
      count: props.count
    };

    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
    this.resetCount = this.resetCount.bind(this);
  }

  incrementCount() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  decrementCount() {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  }

  resetCount() {
    this.setState(() => ({ count: 0 }));
  }

  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button className="pure-button button-success" onClick={this.incrementCount}><i class="fas fa-plus"></i></button>
        <button className="pure-button button-warning" onClick={this.resetCount}><i class="fas fa-sync"></i></button>
        <button className="pure-button button-error" onClick={this.decrementCount}><i class="fas fa-minus"></i></button>
      </div>
    );
  }
}

Clicker.defaultProps = {
  count: 0
};

Clicker.propTypes = {
  count: PropTypes.number
};

export default Clicker;