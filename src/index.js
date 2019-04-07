import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

// import CSS
import './index.css'

// import components
import Home from './components/pages/Home'
import About from './components/pages/About'
import App from './components/todos/App'; // TODO App
import ClickerApp from './components/clicker/ClickerApp'
import TimerApp from './components/timer/TimerApp'

// Shopping Cart
import CartApp from './components/cart/CartApp'
const url = window.location.pathname;
const routing = (
  <Router>
    <div>
      <div className="pure-menu pure-menu-horizontal">
        <Link to="./" className="pure-menu-heading pure-menu-link">React JS</Link>
        <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a href="!#" id="menuLink1" className="pure-menu-link">Apps</a>
            <ul className="pure-menu-children">
              <li className="pure-menu-item"><Link to="./todo" className="pure-menu-link">To do</Link></li>
              <li className="pure-menu-item"><Link to="./clicker" className="pure-menu-link">Clicker</Link></li>
              <li className="pure-menu-item"><Link to="./timer" className="pure-menu-link">Timer</Link></li>
            </ul>
          </li>
          <li className="pure-menu-item">
            <Link to="./about" className="pure-menu-link">About</Link>
          </li>
        </ul>
      </div>
      <Route exact path={url} component={Home} />
      <Route path={url + 'todo'} component={App} />
      <Route path={url + 'clicker'} component={ClickerApp} />
      <Route path={url + 'timer'} component={TimerApp} />
      <Route path={url + 'about'} component={About} />
    </div>
  </Router >
)

ReactDOM.render(routing, document.getElementById('root'));
ReactDOM.render(<CartApp />, document.getElementById('shopping-cart'));

