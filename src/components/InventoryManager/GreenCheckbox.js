import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const GreenCheckbox = withStyles({
  root: {
    color: '#53AA48',
    '&$checked': {
      color: '#53AA48',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default GreenCheckbox;
