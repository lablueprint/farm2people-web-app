import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { store } from '../../lib/redux/store';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      /* User must be authenticated and be part of the allowedRules to access
      a PrivateRoute */
      if (store.getState().authenticated
        && allowedRoles.includes(store.getState().userData.user.fields['user type'])) {
        return <Component {...props} />;
      }
      if (!store.getState().authenticated && allowedRoles.includes('')) {
        return <Component {...props} />;
      }
      /* If user is authenticated and not part of the allowedRules, they are
      taken to their home page */
      if (store.getState().authenticated) {
        return <Redirect to="/" />;
      }
      /* Redirects to sign in page because user is not logged in */
      return <Redirect to="/signin" />;
    }}
  />
);

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,

};
