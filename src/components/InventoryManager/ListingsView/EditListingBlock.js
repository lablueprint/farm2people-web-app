import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ListingInputField from '../ListingInputField';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Work Sans',
    color: '#333333',
  },
  headerSpacing: {
    paddingRight: '3rem',
  },
  index: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  accent: {
    color: '#FF765D',
  },
  slash: {
    fontWeight: '200',
  },
  heading: {
    fontWeight: '700',
    fontSize: '1.5rem',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '0.1rem',
    paddingLeft: '.5rem',
  },
  subheading: {
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  paddingLeft: {
    paddingLeft: '1rem',
  },
  editButton: {
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    padding: '.5rem',
    color: '#53AA48',
  },
  spacing: {
    padding: '1rem 3rem',
  },
  text: {
    fontSize: '1.2rem',
  },
});

export default function EditListingBlock({
  getListingRecord, name, index, image,
}) {
  const record = getListingRecord();
  const fields = Object.entries(record);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card variant="outlined">
        <CardHeader
          className={classes.headerSpacing}
          title={(
            <>
              <Typography display="inline" className={`${classes.root} ${classes.index} ${classes.accent} ${classes.paddingLeft}`}>
                {`0${index}`}
              </Typography>
              <Typography display="inline" className={`${classes.root} ${classes.accent} ${classes.slash} ${classes.index}`}>
                /
              </Typography>
              <Typography className={`${classes.root} ${classes.heading}`} display="inline">
                {name}
              </Typography>
            </>
            )}
          action={(
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        />
        <Collapse in={open} unmountOnExit>
          <CardContent>
            <Grid container spacing={1} className={classes.paddingLeft}>
              {
                fields.map((field) => {
                  const { size, ...inputProps } = field[1];
                  return (
                    <Grid container item xs={12} key={field[0]}>
                      { image
                        ? (
                          <Grid container item spacing={1}>
                            <Grid item xs={size}>
                              <Image src={inputProps.url} />
                            </Grid>
                          </Grid>
                        )
                        : (
                          <Grid container item xs={size}>
                            <ListingInputField {...inputProps} />
                          </Grid>
                        )}
                    </Grid>
                  );
                })
              }
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

EditListingBlock.defaultProps = {
  image: false,
};

EditListingBlock.propTypes = {
  getListingRecord: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.bool,
};
