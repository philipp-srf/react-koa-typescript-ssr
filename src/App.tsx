import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { RadioPlayer } from './containers/RadioPlayer';
import { VideoPlayer } from './containers/VideoPlayer';
import { routes } from './Routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/radio/">Radio</Link>
            </li>
            <li>
              <Link to="/tv/">TV</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
