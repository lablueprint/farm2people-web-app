import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListingsView from './ListingsView';
import AddListingButton from './AddListingButton';

const useStyles = makeStyles({
  button: {
    display: 'flex',
  },
});
export default function AddListingScreen() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.button}>
        <AddListingButton />
      </div>
      <ListingsView />
    </>
  );
}
