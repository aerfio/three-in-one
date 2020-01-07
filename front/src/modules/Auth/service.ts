import { Dispatch } from "redux";
import { ActionsService } from '../actionsService';

import { AuthActions } from "./actions";
import { AuthService } from "../../services/Auth";
import { LoginDTO, RegistrationDTO } from "../../services/Auth/types";

import { NotificationService } from "../../services/Notification";

export class AuthActionsService extends ActionsService {
  constructor(
    private readonly _actions: AuthActions,
    private readonly _authSvc: AuthService,
    private readonly _notificationSvc: NotificationService,
  ) {
    super()
  }

  login = (dto: LoginDTO) => async (dispatch: Dispatch) => {
    dispatch(this._actions.loginAttempt());

    try {
      await this._authSvc.login(dto);
      dispatch(this._actions.loginSuccess());
      this._notificationSvc.success("Pomyślnie zalogowano");
    } catch (err) {
      dispatch(this._actions.loginFailure(err));
      this._notificationSvc.error("Nie udało się zalogować");
    }
  };

  register = (dto: RegistrationDTO) => async (dispatch: Dispatch) => {
    dispatch(this._actions.loginAttempt());

    try {
      await this._authSvc.register(dto);
      dispatch(this._actions.loginSuccess());
      this._notificationSvc.success("Pomyślnie zarejestrowano");
    } catch (err) {
      dispatch(this._actions.loginFailure(err));
      this._notificationSvc.error("Nie udało się zarejestrować");
    }
  };

  logout = () => async (dispatch: Dispatch) => {
    this._authSvc.logout();
    dispatch(this._actions.logoutSuccess());
    this._notificationSvc.success("Pomyślnie wylogowano");
  };
}
