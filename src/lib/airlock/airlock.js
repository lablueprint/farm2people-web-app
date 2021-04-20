import { base } from '../airtable/airtable';
import {
  refreshUserData,
  clearUserData,
} from '../redux/userData';

const AUTHENTICATION_ERR_STRING = 'AUTHENTICATION_REQUIRED';

const signupUser = async (email, password, role, org, zipcode,
  fullname, phone, comments) => {
  try {
    /* eslint-disable */
    const { user, token } = base.register({
      username: email,
      password: password,
      fields: {
        'user type': role,
        'organization': org,
        'zipcode': zipcode,
        'phone': phone,
        'additional comments': comments,
        'contact name': fullname,
        'account approval': 'unapproved',
        'registration approval': 'unapproved',
      },
    });
    return user.id;
  } catch (err) {
    return null;
  }
};

const loginUser = async (email, password) => {
  try {
    const res = await base.login({ username: email, password });
    refreshUserData(res.body);
    if (!res.body.success) {
      return { match: false, found: false };
    }
    return { match: true, found: true };

  } catch (err) {
    if (err.error === AUTHENTICATION_ERR_STRING) {
      return { match: false, found: true };
    }
    return { match: false, found: false };
  }
};

const logoutUser = async () => {
  try {
    const status = await base.logout();
    if (!status.body.success) {
      return false;
    }
    clearUserData();
    return true;
  } catch (err) {
    return false;  }
};

export { loginUser, logoutUser, signupUser };