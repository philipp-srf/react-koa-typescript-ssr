import * as React from 'react';
import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navigation } from './Navigation';
import { routes } from './Routes';

export const App = () => (
  <Fragment>
    <Navigation />
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  </Fragment>
);
