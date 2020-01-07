import React from "react";
import { connect, ConnectedProps } from 'react-redux';

import { actions } from '../../context';

import { Place as PlaceType } from "../../services/Places/types";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';

type Props = ConnectedProps<typeof connector> & {
  place: PlaceType,
}

const Place: React.FunctionComponent<Props> = ({
  place,
  selectedPlace,
  selectPlace,
}) => {
  const star = selectedPlace && place.id === selectedPlace.id ? (
    <ListItemIcon>
      <VisibilityIcon />
    </ListItemIcon>
  ) : null;

  return (
    <ListItem 
      button 
      onClick={() => selectPlace(place)}
    >
      {star}
      <ListItemText primary={place.name} />
    </ListItem>
  );
}

const mapState = (state: any) => ({
  selectedPlace: state.discover.place,
})

const mapDispatch = ({
  selectPlace: actions.discover.selectPlace,
})

const connector = connect(
  mapState,
  mapDispatch,
)
export default connector(Place);

