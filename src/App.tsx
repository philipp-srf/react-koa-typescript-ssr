import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { AppContext } from './AppContext';
import { routes } from './Routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider value={{}}>
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
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
