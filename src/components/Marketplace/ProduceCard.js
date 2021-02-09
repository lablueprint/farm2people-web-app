import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import crackedEggert from './cracked_eggert.png';

const useStyles = makeStyles({
  img: { // Height must be specified for image to appear
    height: 180,
    width: '90%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  cardContainer: {
    width: '30%',
    height: '80%',
  },
});

export default function ProduceCard() {
  const styles = useStyles();
  return (
    <Card className={styles.cardContainer}>
      <CardMedia
        className={styles.img}
        image={crackedEggert}
        title="Produce Image"
      />
      <CardContent>
        <div> Organic Eggs </div>
        <div> Ryans farm </div>
        <div> $58.00/pallet </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small">
          <IconButton>
            <AddIcon />
          </IconButton>
          ADD TO CART
        </Button>
      </CardActions>
    </Card>

  );
}
