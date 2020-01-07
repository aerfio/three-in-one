import { Dispatch } from "redux";
import { ActionsService } from '../actionsService';
import { navigate } from "@reach/router";

import { DiscoverActions } from "./actions";
import { PlacesService } from "../../services/Places";
import { Place, CreatePlaceDTO, EditPlaceDTO } from "../../services/Places/types";

import { NotificationService } from "../../services/Notification";

export class DiscoverActionsService extends ActionsService {
  constructor(
    private readonly _actions: DiscoverActions,
    private readonly _placesSvc: PlacesService,
    private readonly _notificationSvc: NotificationService,
  ) {
    super()
  }

  fetchPlaces = () => async (dispatch: Dispatch) => {
    dispatch(this._actions.fetchPlacesAttempt());

    try {
      const places = await this._placesSvc.fetchPlaces();
      dispatch(this._actions.fetchPlacesSuccess(places));
    } catch (err) {
      dispatch(this._actions.fetchPlacesFailure(err));
    }
  };

  selectPlace = (place: Place) => async (dispatch: Dispatch) => {
    dispatch(this._actions.selectPlace(place));
  };

  createPlace = (dto: CreatePlaceDTO) => async (dispatch: Dispatch) => {
    dispatch(this._actions.createPlaceAttempt());

    try {
      await this._placesSvc.createPlace(dto);
      dispatch(this._actions.createPlaceSuccess(dto));
      this._notificationSvc.success("Pomyślnie dodano miejsce");
      navigate("/");
    } catch (err) {
      dispatch(this._actions.createPlaceFailure(err));
      this._notificationSvc.error("Nie udało się dodać miejsca");
    }
  };

  removePlace = (id: string) => async (dispatch: Dispatch) => {
    dispatch(this._actions.removePlaceAttempt());

    try {
      await this._placesSvc.removePlace(id);
      dispatch(this._actions.removePlaceSuccess(id));
      this._notificationSvc.success("Pomyślnie usunięto miejsce");
    } catch (err) {
      dispatch(this._actions.removePlaceFailure(err));
      this._notificationSvc.error("Nie udało się usunąć miejsca");
    }
  }

  editPlace = (dto: EditPlaceDTO) => async (dispatch: Dispatch) => {
    dispatch(this._actions.editPlaceAttempt());

    try {
      await this._placesSvc.editPlace(dto);
      dispatch(this._actions.editPlaceSuccess(dto));
      this._notificationSvc.success("Pomyślnie zedytowano miejsce");
    } catch (err) {
      dispatch(this._actions.editPlaceFailure(err));
      this._notificationSvc.error("Nie udało się zedytować miejsca");
    }
  };
}
