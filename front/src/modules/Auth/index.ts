import initReducer from './reducer';
import { AuthActionsService } from './service';
import { types, createActions } from './actions';

import { AuthService } from "../../services/Auth";
import { NotificationService } from "../../services/Notification";

interface Services {
  authSvc: AuthService,
  notificationSvc: NotificationService,
}

const configureAuthModule = (services: Services) => {
  const actions = new AuthActionsService(
    createActions(),
    services.authSvc,
    services.notificationSvc,
  );

  const reducer = initReducer({
    authSvc: services.authSvc,
  });

  return { actions, reducer, types };
};

export default configureAuthModule;
