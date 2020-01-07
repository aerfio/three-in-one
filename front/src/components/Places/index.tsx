import React, { useEffect } from "react";
import { connect, ConnectedProps } from 'react-redux';

import { actions } from '../../context';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PlacesList from "./List";
import Map from "./Map";

import { Wrapper } from "./styled";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

type Props = ConnectedProps<typeof connector>

const Places: React.FunctionComponent<Props> = ({
  fetchPlaces,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])

  return (
    <Wrapper>
      <Grid container className={classes.root} spacing={2}> 
        <Grid item xs={6}>
          <PlacesList />
        </Grid>
        <Grid item xs={6}>
          <Map />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const mapDispatch = ({
  fetchPlaces: actions.discover.fetchPlaces,
})

const connector = connect(
  undefined,
  mapDispatch,
)
export default connector(Places);

