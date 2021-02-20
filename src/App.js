import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
<<<<<<< HEAD
import HomeScreen from './components/Home';
import InventoryManagerScreen from './components/Marketplace';
=======
import { InventoryManagerScreen, MarketplaceScreen } from './components/Marketplace';
>>>>>>> ff0d143313ee3afb734fd0f9d1c7d4b1cc9faf6a
import ContactScreen from './components/Contact';
import NotificationsScreen from './components/Notifications';
import CartScreen from './components/Cart';
import AddFarm from './components/AddFarm';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
<<<<<<< HEAD
          <Route path="/" exact component={HomeScreen} />
          <Route path="/marketplace" exact component={InventoryManagerScreen} />
=======
          <Route path="/" exact component={InventoryManagerScreen} />
          <Route path="/marketplace" exact component={MarketplaceScreen} />
>>>>>>> ff0d143313ee3afb734fd0f9d1c7d4b1cc9faf6a
          <Route path="/contact" exact component={ContactScreen} />
          <Route path="/notifications" exact component={NotificationsScreen} />
          <Route path="/profile" exact component={AddFarm} />
          <Route path="/cart" exact component={CartScreen} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
