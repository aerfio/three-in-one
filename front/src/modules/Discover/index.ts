import initReducer from './reducer';
import { DiscoverActionsService } from './service';
import { types, createActions } from './actions';

import { PlacesService } from "../../services/Places";
import { NotificationService } from "../../services/Notification";

interface Services {
  placesSvc: PlacesService,
  notificationSvc: NotificationService,
}

const configureDiscoverModule = (services: Services) => {
  const actions = new DiscoverActionsService(
    createActions(),
    services.placesSvc,
    services.notificationSvc,
  );

  const reducer = initReducer();

  return { actions, reducer, types };
};

export default configureDiscoverModule;
