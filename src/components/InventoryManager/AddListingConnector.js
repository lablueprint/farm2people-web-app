import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

const AddListingConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50%)',
    right: 'calc(50%)',
  },
  active: {
    '& $line': {
      borderColor: '#53AA48',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#53AA48',
    },
  },
  line: {
    borderColor: '#F1F2F2',
    borderRadius: 1,
    borderWidth: '8px',
  },
})(StepConnector);

export default AddListingConnector;
