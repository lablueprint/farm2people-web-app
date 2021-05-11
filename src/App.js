import React, { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { store, history } from './lib/redux/store';
import { Navbar, Footer, PrivateRoute } from './components/Navigation';
import InventoryManagerScreen from './components/InventoryManager';
import MarketplaceScreen from './components/Marketplace';
import ContactScreen from './components/Contact';
import NotificationsScreen from './components/Notifications';
import CartScreen from './components/Cart';
import ProfileScreen from './components/Profile';
import SignInScreen from './components/SignIn';
import SignUpScreen from './components/SignUp';
import {
  LandingScreen, ForBuyersScreen, ForSellersScreen, AboutScreen,
} from './components/PublicView';

export default function App() {
  // userRole can either be: {'', 'buyer', 'vendor', 'agency'}
  // setUserRole keeps track of the user's role on the top of our app
  // setAuthenticad keeps track of the user's login status on the
  // top level of our app
  const publicPermission = ['']; /* only for users who are not logged in */
  const sellingPermissions = ['vendor'];
  const purchasingPermissions = ['buyer', 'agency'];
  const allPermissions = ['buyer', 'agency', 'vendor'];
  const getInitialRole = () => (store.getState().userData == null ? '' : store.getState().userData.user.fields['user type']);
  const getInitialAuth = () => (store.getState().authenticated);
  const [userRole, setUserRole] = useState(getInitialRole());
  const [authenticated, setAuthenticated] = useState(getInitialAuth());
  const getHomeComponent = () => {
    if (authenticated === true) {
      return userRole === 'vendor' ? InventoryManagerScreen : MarketplaceScreen;
    }
    return LandingScreen;
  };

  return (
    <div className="App">
      <Router history={history}>
        <Navbar
          authenticated={authenticated}
          userRole={userRole}
          setAuthAndRefreshNavbar={setAuthenticated}
          setUserRoleAndRefreshNavbar={setUserRole}
        />
        <Switch>
          <Route path="/" exact component={getHomeComponent()} />
          <PrivateRoute allowedRoles={sellingPermissions} path="/inventorymanager" exact component={InventoryManagerScreen} />
          <PrivateRoute allowedRoles={purchasingPermissions} path="/marketplace" exact component={MarketplaceScreen} />
          <PrivateRoute allowedRoles={allPermissions} path="/notifications" exact component={NotificationsScreen} />
          <PrivateRoute allowedRoles={allPermissions} path="/profile" exact component={ProfileScreen} />
          <PrivateRoute allowedRoles={purchasingPermissions} path="/cart" exact component={CartScreen} />
          <Route path="/contact" exact component={ContactScreen} />
          <Route
            path="/signin"
            render={(props) => (
              <SignInScreen
                {...props}
                setAuthAndRefreshNavbar={setAuthenticated}
                setUserRoleAndRefreshNavbar={setUserRole}
              />
            )}
          />
          <PrivateRoute allowedRoles={publicPermission} path="/signup" exact component={SignUpScreen} />
          <PrivateRoute allowedRoles={publicPermission} path="/landing" exact component={LandingScreen} />
          <PrivateRoute allowedRoles={publicPermission} path="/forbuyers" exact component={ForBuyersScreen} />
          <PrivateRoute allowedRoles={publicPermission} path="/forsellers" exact component={ForSellersScreen} />
          <PrivateRoute allowedRoles={publicPermission} path="/about" exact component={AboutScreen} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
