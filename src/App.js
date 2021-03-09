import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
import { InventoryManagerScreen, MarketplaceScreen } from './components/Marketplace';
import ContactScreen from './components/Contact';
import NotificationsScreen from './components/Notifications';
import CartScreen from './components/Cart';
import AddFarm from './components/AddFarm';
import SignUpScreen from './components/SignUp';
import SignInScreen from './components/SignIn';
import Onboarding from './components/Onboarding';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={InventoryManagerScreen} />
          <Route path="/marketplace" exact component={MarketplaceScreen} />
          <Route path="/contact" exact component={ContactScreen} />
          <Route path="/notifications" exact component={NotificationsScreen} />
          <Route path="/profile" exact component={AddFarm} />
          <Route path="/cart" exact component={CartScreen} />
          <Route path="/signup" exact component={SignUpScreen} />
          <Route path="/signin" exact component={SignInScreen} />
          <Route path="/onboarding" exact component={Onboarding} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
