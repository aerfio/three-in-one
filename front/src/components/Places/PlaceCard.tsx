import React from 'react';

import { Place } from "../../services/Places/types";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }),
);

interface Props {
  place: Place
}

const PlaceCard: React.FunctionComponent<Props> = ({
  place,
}) => {
  // @ts-ignore
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {place.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {place.visitedDate}
        </Typography>
        <Typography variant="body2" component="p">
          {place.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PlaceCard;