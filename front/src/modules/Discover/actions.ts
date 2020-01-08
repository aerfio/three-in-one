import { actionCreator } from "../../common";

import { Place } from "../../services/Places/types";

export const types = {
  FETCH_PLACES_ATTEMPT: 'FETCH_PLACES_ATTEMPT',
  FETCH_PLACES_SUCCESS: 'FETCH_PLACES_SUCCESS',
  FETCH_PLACES_FAILURE: 'FETCH_PLACES_FAILURE',

  SELECT_PLACE: 'SELECT_PLACE',

  CREATE_PLACE_ATTEMPT: 'CREATE_PLACE_ATTEMPT',
  CREATE_PLACE_SUCCESS: 'CREATE_PLACE_SUCCESS',
  CREATE_PLACE_FAILURE: 'CREATE_PLACE_FAILURE',

  REMOVE_PLACE_ATTEMPT: 'REMOVE_PLACE_ATTEMPT',
  REMOVE_PLACE_SUCCESS: 'REMOVE_PLACE_SUCCESS',
  REMOVE_PLACE_FAILURE: 'REMOVE_PLACE_FAILURE',

  EDIT_PLACE_ATTEMPT: 'EDIT_PLACE_ATTEMPT',
  EDIT_PLACE_SUCCESS: 'EDIT_PLACE_SUCCESS',
  EDIT_PLACE_FAILURE: 'EDIT_PLACE_FAILURE',
};

export function createActions() {
  const fetchPlacesAttempt = actionCreator(types.FETCH_PLACES_ATTEMPT);
  const fetchPlacesSuccess = actionCreator<Place[]>(types.FETCH_PLACES_SUCCESS);
  const fetchPlacesFailure = actionCreator<Error>(types.FETCH_PLACES_FAILURE);

  const selectPlace = actionCreator<Place>(types.SELECT_PLACE);

  const createPlaceAttempt = actionCreator(types.CREATE_PLACE_ATTEMPT);
  const createPlaceSuccess = actionCreator<Place>(types.CREATE_PLACE_SUCCESS);
  const createPlaceFailure = actionCreator<Error>(types.CREATE_PLACE_FAILURE);

  const removePlaceAttempt = actionCreator(types.REMOVE_PLACE_ATTEMPT);
  const removePlaceSuccess = actionCreator<number>(types.REMOVE_PLACE_SUCCESS);
  const removePlaceFailure = actionCreator<Error>(types.REMOVE_PLACE_FAILURE);

  const editPlaceAttempt = actionCreator(types.EDIT_PLACE_ATTEMPT);
  const editPlaceSuccess = actionCreator<Place>(types.EDIT_PLACE_SUCCESS);
  const editPlaceFailure = actionCreator<Error>(types.EDIT_PLACE_FAILURE);

  return {
    fetchPlacesAttempt,
    fetchPlacesSuccess,
    fetchPlacesFailure,

    selectPlace,

    createPlaceAttempt,
    createPlaceSuccess,
    createPlaceFailure,

    removePlaceAttempt,
    removePlaceSuccess,
    removePlaceFailure,

    editPlaceAttempt,
    editPlaceSuccess,
    editPlaceFailure,
  }
}

export type DiscoverActions = ReturnType<typeof createActions>;
