import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  box: {
    // background: '#aaffaa',
  },
  leftHeading: {
    fontFamily: 'Work Sans',
    fontSize: '28px',
    fontWeight: '700',
    color: '#373737',
    textAlign: 'left',
  },
  form: {
    // background: 'pink',
    width: '400px',
    fontFamily: 'Work Sans',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  formControl: {
    margin: '10px',
  },
  inputLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    color: '#373737',
    '&:after': {
      content: '" *"',
      color: '#f00',
    },
  },
  placeholder: {
    fontFamily: 'Work Sans',
  },
  changePasswordButton: {
    fontFamily: 'Work Sans',
  },
  cancelButton: {
    fontFamily: 'Work Sans',
    textTransform: 'none',
    fontWeight: '600',
  },
  centerAlignDialogActions: {
    justifyContent: 'center',
  },
});

export default useStyles;
