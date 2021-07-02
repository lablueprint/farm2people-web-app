import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '../../lib/redux/store';
import MarketplaceScreen from './MarketplaceScreen';

export default function MarketplaceRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/marketplace" component={MarketplaceScreen} />
        <Route exact path="/marketplace/:farmId" component={MarketplaceScreen} />
      </Switch>
    </Router>
  );
}
