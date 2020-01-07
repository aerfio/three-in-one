import { Action } from "../types";

import { Place } from "../../services/Places/types"

import { types } from "./actions";

export interface DiscoverState {
  places: Place[];
  place: Place | null;
  error: Error | null,
}

const initReducer = () => {
  const INITIAL_STATE: DiscoverState = {
    places: [],
    place: null,
    error: null,
  };

  return (state: DiscoverState = INITIAL_STATE, action: Action): DiscoverState => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_PLACES_ATTEMPT:
        return {
          ...state,
          error: null,
        };
      case types.FETCH_PLACES_SUCCESS:
        return {
          ...state,
          places: payload,
        };
      case types.FETCH_PLACES_FAILURE:
        return {
          ...state,
          places: [],
          error: payload,
        };

      case types.SELECT_PLACE:
        return {
          ...state,
          place: payload,
          error: null,
        };

      case types.CREATE_PLACE_ATTEMPT:
        return {
          ...state,
          error: null,
        };
      case types.CREATE_PLACE_SUCCESS:
        return {
          ...state,
          places: [...state.places, payload],
        }
      case types.CREATE_PLACE_FAILURE:
        return {
          ...state,
          error: payload,
        }

      case types.REMOVE_PLACE_ATTEMPT:
        return {
          ...state,
          error: null,
        };
      case types.REMOVE_PLACE_SUCCESS:
        return {
          ...state,
          places: state.places.filter(u => u !== payload.id),
        }
      case types.REMOVE_PLACE_FAILURE:
        return {
          ...state,
          error: payload,
        }

      case types.EDIT_PLACE_ATTEMPT:
        return {
          ...state,
          error: null,
        };
      case types.EDIT_PLACE_SUCCESS:
        return {
          ...state,
          places: state.places.map(u => {
            if (u.id === payload.id) {
              return payload;
            }
            return u;
          }),
        }
      case types.EDIT_PLACE_FAILURE:
        return {
          ...state,
          error: payload,
        }

      default:
        return state;
    }
  };
};

export default initReducer;
