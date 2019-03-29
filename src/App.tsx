import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { RadioPlayer } from './containers/RadioPlayer';
import { VideoPlayer } from './containers/VideoPlayer';

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

        <Route path="/radio/" exact component={RadioPlayer} />
        <Route path="/tv/" exact component={VideoPlayer} />
      </BrowserRouter>
    );
  }
}

export default App;
