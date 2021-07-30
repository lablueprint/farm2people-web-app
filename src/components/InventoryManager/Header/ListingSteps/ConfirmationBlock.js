import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

export default function ConfirmationBlock({
  getListingRecord, name, index, setStep, image,
}) {
  const record = getListingRecord();
  const fields = Object.entries(record);
  const classes = useStyles();

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
            <Button onClick={() => setStep(index - 1)}>
              <Typography className={`${classes.root} ${classes.editButton}`}>EDIT</Typography>
            </Button>
          )}
        />
        <CardContent>
          {
            fields.map((field) => (
              <div key={field[0]}>
                <Typography className={`${classes.root} ${classes.subheading} ${classes.paddingLeft}`}>
                  {(field[0]).toUpperCase()}
                </Typography>
                { image
                  ? (
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Image src={field[1]} />
                      </Grid>
                    </Grid>
                  )
                  : (
                    <Typography className={`${classes.root} ${classes.text} ${classes.paddingLeft}`}>
                      {field[1]}
                    </Typography>
                  )}
              </div>
            ))
          }
        </CardContent>
      </Card>
    </>
  );
}

ConfirmationBlock.defaultProps = {
  image: false,
};

ConfirmationBlock.propTypes = {
  getListingRecord: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  image: PropTypes.bool,
};
