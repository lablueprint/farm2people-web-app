import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
import HomeScreen from './components/Home';
import MarketplaceScreen from './components/Marketplace';
import ContactScreen from './components/Contact';
import NotificationsScreen from './components/Notifications';
import ProfileScreen from './components/Profile';
import CartScreen from './components/Cart';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/marketplace" exact component={MarketplaceScreen} />
          <Route path="/contact" exact component={ContactScreen} />
          <Route path="/notifications" exact component={NotificationsScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/cart" exact component={CartScreen} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
