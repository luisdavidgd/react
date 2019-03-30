import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

// import components
import Home from './components/pages/Home'
import About from './components/pages/About'
import App from './components/todos/App'; // TODO App
import Timer from './components/timer/Timer'

const routing = (
  <Router>
    <div>
      <div className="pure-menu pure-menu-horizontal">
        <Link to="./" className="pure-menu-heading pure-menu-link">React JS</Link>
        <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a href="#!" id="menuLink1" className="pure-menu-link">Apps</a>
            <ul className="pure-menu-children">
              <li className="pure-menu-item"><Link to="./todo" className="pure-menu-link">To do</Link></li>
              <li className="pure-menu-item"><Link to="./timer" className="pure-menu-link">Timer</Link></li>
              <li className="pure-menu-item"><Link to="./clicker" className="pure-menu-link">Clicker</Link></li>
              <li className="pure-menu-item"><Link to="#" className="pure-menu-link">Timer</Link></li>
            </ul>
          </li>
          <li className="pure-menu-item">
            <Link to="./about" className="pure-menu-link">About</Link>
          </li>
        </ul>
      </div>

      <Route exact path="/react-sample/" component={Home} />
      <Route path="/react-sample/todo" component={App} />
      <Route path="/react-sample/timer" component={Timer} />
      <Route path="/react-sample/about" component={About} />
    </div>
  </Router >
)

ReactDOM.render(routing, document.getElementById('root'));

