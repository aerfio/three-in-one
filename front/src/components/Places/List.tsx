import React from "react";
import { connect, ConnectedProps } from 'react-redux';

import { Place as PlaceType } from "../../services/Places/types";

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { default as MaterialList } from '@material-ui/core/List';

import Place from "./Place";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 400,
    },
  }),
);

type Props = ConnectedProps<typeof connector>

const List: React.FunctionComponent<Props> = ({
  places,
}) => {
  const classes = useStyles();

  if (!places || !places.length) {
    return null;
  }
 
  return (
    <MaterialList component="nav" className={classes.root} aria-label="contacts">
      {places.map((place: PlaceType) => (
        <Place place={place} key={place.id} />
      ))}
    </MaterialList>
  );
}

const mapState = (state: any) => ({
  places: state.discover.places,
})

const connector = connect(
  mapState,
)
export default connector(List);
