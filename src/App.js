import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navigation';
import HomeScreen from './components/Home';
import MarketplaceScreen from './components/Marketplace';
import QuotesScreen from './components/Quotes';
import NotificationsScreen from './components/Notifications';
import AccountScreen from './components/Account';
import SignInScreen from './components/SignIn';
import SignUpForm from './components/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/marketplace" exact component={MarketplaceScreen} />
          <Route path="/quotes" exact component={QuotesScreen} />
          <Route path="/account" exact component={AccountScreen} />
          <Route path="/notifications" exact component={NotificationsScreen} />
          <Route path="/sign-in" exact component={SignInScreen} />
          <Route path="/sign-up" exact component={SignUpForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
