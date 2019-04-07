import React, { Component } from 'react'

const API = 'http://cat-fact.herokuapp.com/facts';
const DEFAULT_QUERY = '/random?animal_type=cat&amount=5';

export class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hits: []
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

  render() {
    const { hits } = this.state;

    return (
      <ul>
        {hits.map(hit =>
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        )}
      </ul>
    )
  }
}

export default Timer