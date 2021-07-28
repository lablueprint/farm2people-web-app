import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { store, history } from './lib/redux/store';
import { Navbar, Footer, PrivateRoute } from './components/Navigation';
import InventoryManagerScreen from './components/InventoryManager';
import MarketplaceScreen from './components/Marketplace';
import ContactScreen from './components/Contact';
import CartScreen from './components/Cart';
import { CheckoutScreen, CheckoutSuccess } from './components/Checkout';
import ProfileScreen from './components/Profile';
import SignInScreen from './components/SignIn';
import SignUpScreen from './components/SignUp';
import { AgencyRegistrationScreen, ProducerRegistrationScreen } from './components/Registration';
import {
  LandingScreen, ForBuyersScreen, ForSellersScreen, AboutScreen,
} from './components/PublicView';
import { base } from './lib/airtable/airtable';
import { RegistrationLimbo, SignupLimbo } from './components/Limbo';
import { logoutUser } from './lib/airlock/airlock';

export function Buffer() {
  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
      style={{ height: '100vh' }}
    >
      <Grid item>
        <CircularProgress align="center" />
      </Grid>
    </Grid>
  );
}

export default function App() {
  // userRole can either be: {'', 'buyer', 'vendor', 'agency'}
  // setUserRole keeps track of the user's role on the top of our app
  // setAuthenticad keeps track of the user's login status on the
  // top level of our app
  const sellingPermissions = ['vendor'];
  const purchasingPermissions = ['buyer', 'agency'];
  const allAuthenticatedPermissions = ['buyer', 'agency', 'vendor'];
  const allPermissions = ['buyer', 'agency', 'vendor', ''];
  const [errorMsg, setErrorMsg] = useState('');

  const getInitialRole = () => (store.getState().userData == null ? '' : store.getState().userData.user.fields['user type']);
  const eitherUnapprovedPermission = (accountApproved, registrationApproved) => {
    if (accountApproved === false || registrationApproved === false) {
      return null;
    }
    return accountApproved === 'unapproved' || registrationApproved === 'unapproved';
  };
  const bothApprovedPermission = (accountApproved, registrationApproved) => {
    if (accountApproved === false || registrationApproved === false) {
      return null;
    }
    return accountApproved === 'approved' && registrationApproved === 'approved';
  };

  const getInitialAuth = () => (store.getState().authenticated);
  const [userRole, setUserRole] = useState(getInitialRole());
  const [authenticated, setAuthenticated] = useState(getInitialAuth());
  const [registrationApproved, setRegistrationApproved] = useState(false);
  const [accountApproved, setAccountApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasRegistration, setHasRegistration] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const getHomeComponent = () => {
    if (authenticated === true && accountApproved === 'approved' && registrationApproved === 'approved') {
      return userRole === 'vendor' ? InventoryManagerScreen : MarketplaceScreen;
    }
    if (!authenticated || (accountApproved !== false && registrationApproved !== false)) {
      return LandingScreen;
    }
    return (
      Buffer
    );
  };

  const getSignUpComponent = () => {
    if (!authenticated) {
      return SignUpScreen;
    }
    if (authenticated === true && (accountApproved === false || registrationApproved === false)) {
      return Buffer;
    }
    if (accountApproved === 'unapproved') {
      return SignupLimbo;
    }
    if (userRole === 'agency') {
      const userID = store.getState().userData.user.id;
      base('Agencies').select({
        filterByFormula: `{user identification} = "${userID}"`,
        view: 'Grid view',
      }).all()
        .then((records) => {
          if (records.length !== 0) {
            setHasRegistration(true);
          }
        });
      if (hasRegistration) {
        return RegistrationLimbo;
      }
      return AgencyRegistrationScreen;
    }
    if (userRole === 'vendor') {
      const userID = store.getState().userData.user.id;
      base('Farms').select({
        filterByFormula: `{user identification} = "${userID}"`,
        view: 'Grid view',
      }).all()
        .then((records) => {
          if (records.length !== 0) {
            setHasRegistration(true);
          }
        });
      if (hasRegistration) {
        return RegistrationLimbo;
      }
      return ProducerRegistrationScreen;
    }
    if (userRole === 'buyer') {
      return SignupLimbo;
    }
    return null;
  };

  const handleLogOut = async (evt) => {
    evt.preventDefault();
    try {
      const status = await logoutUser();
      if (!status) {
        setErrorMsg('Error logging out.');
        setAlert(true);
      } else {
        setAuthenticated(false);
        setUserRole('');
        history.push('/');
      }
    } catch (err) {
      setErrorMsg('Error logging out.');
      setAlert(true);
    }
  };

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      const userID = store.getState().userData.user.id;
      base('Users').find(userID, (err, record) => {
        if (err) { console.log(err.message); return; }
        setRegistrationApproved(record.fields['registration approval']);
        setAccountApproved(record.fields['account approval']);
        setLoading(false);
      });
    }
  }, [authenticated]);

  return (
    <>
      {(showAlert && errorMsg)
        && (
          <Alert severity="error" className="errorAlert" onClose={() => setAlert(false)}>
            <AlertTitle> Input error </AlertTitle>
            {errorMsg}
          </Alert>
        )}
      <div className="App">
        <Router history={history}>
          <Navbar
            loading={loading}
            accountApproved={accountApproved}
            registrationApproved={registrationApproved}
            authenticated={authenticated}
            userRole={userRole}
            handleLogOut={handleLogOut}
          />
          <Switch>
            <PrivateRoute loading={loading} allowedRoles={allPermissions} approvalPermissions path="/" exact component={getHomeComponent()} />
            <PrivateRoute loading={loading} allowedRoles={sellingPermissions} approvalPermissions={bothApprovedPermission(accountApproved, registrationApproved)} path="/inventorymanager" exact component={InventoryManagerScreen} />
            <PrivateRoute loading={loading} allowedRoles={purchasingPermissions} approvalPermissions={bothApprovedPermission(accountApproved, registrationApproved)} path="/marketplace" exact component={MarketplaceScreen} />
            <PrivateRoute loading={loading} allowedRoles={allAuthenticatedPermissions} approvalPermissions={bothApprovedPermission(accountApproved, registrationApproved)} path="/profile" exact component={ProfileScreen} />
            <PrivateRoute loading={loading} allowedRoles={purchasingPermissions} approvalPermissions={bothApprovedPermission(accountApproved, registrationApproved)} path="/cart" exact component={CartScreen} />
            <PrivateRoute loading={loading} allowedRoles={purchasingPermissions} approvalPermissions={bothApprovedPermission(accountApproved, registrationApproved)} path="/cart/checkout" exact component={CheckoutScreen} />
            <PrivateRoute loading={loading} allowedRoles={purchasingPermissions} approvalPermissions={bothApprovedPermission(accountApproved, registrationApproved)} path="/cart/success" exact component={CheckoutSuccess} />
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
            <PrivateRoute loading={loading} allowedRoles={allPermissions} approvalPermissions={eitherUnapprovedPermission(accountApproved, registrationApproved)} path="/signup" exact component={getSignUpComponent()} />
            <PrivateRoute loading={loading} allowedRoles={allPermissions} approvalPermissions={eitherUnapprovedPermission(accountApproved, registrationApproved)} path="/landing" exact component={LandingScreen} />
            <PrivateRoute loading={loading} allowedRoles={allPermissions} approvalPermissions={eitherUnapprovedPermission(accountApproved, registrationApproved)} path="/forbuyers" exact component={ForBuyersScreen} />
            <PrivateRoute loading={loading} allowedRoles={allPermissions} approvalPermissions={eitherUnapprovedPermission(accountApproved, registrationApproved)} path="/forsellers" exact component={ForSellersScreen} />
            <PrivateRoute loading={loading} allowedRoles={allPermissions} approvalPermissions={eitherUnapprovedPermission(accountApproved, registrationApproved)} path="/about" exact component={AboutScreen} />
          </Switch>
          <Footer
            loading={loading}
            accountApproved={accountApproved}
            registrationApproved={registrationApproved}
            handleLogOut={handleLogOut}
          />
        </Router>
      </div>
    </>
  );
}
