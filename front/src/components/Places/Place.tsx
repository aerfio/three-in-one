import React from "react";
import { connect, ConnectedProps } from 'react-redux';

import { actions } from '../../context';

import { Place as PlaceType } from "../../services/Places/types";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type Props = ConnectedProps<typeof connector> & {
  place: PlaceType,
}

const Place: React.FunctionComponent<Props> = ({
  place,
  selectedPlace,
  selectPlace,
  removePlace,
}) => {
  const star = selectedPlace && place.id === selectedPlace.id ? (
    <ListItemIcon>
      <VisibilityIcon />
    </ListItemIcon>
  ) : null;

  return (
    <ListItem 
      button 
    >
      <ListItemIcon>
        <DeleteForeverIcon 
          onClick={() => removePlace(place.id)}
        />
      </ListItemIcon>
      {star}
      <ListItemText 
        primary={place.name} 
        onClick={() => selectPlace(place)}
      />
    </ListItem>
  );
}

const mapState = (state: any) => ({
  selectedPlace: state.discover.place,
})

const mapDispatch = ({
  selectPlace: actions.discover.selectPlace,
  removePlace: actions.discover.removePlace,
})

const connector = connect(
  mapState,
  mapDispatch,
)
export default connector(Place);

