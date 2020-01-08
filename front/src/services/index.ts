import { Service } from "./types";

import { NotificationService } from "./Notification";
import { HttpClient } from "./HttpClient";
import { SessionStorageService } from "./SessionStorage";
import { GraphQLClient } from "./GraphQL";

import { configureAuthService } from "./Auth";
import { AUTH_SESSION_STORAGE_TOKEN } from "./Auth/types";

import { configurePlacesService } from "./Places";

const configureServices = async ({
  apiBasePath,
}: {
  apiBasePath: string
}): Promise<{ [key: string]: Service }> => {
  const notificationSvc = new NotificationService();
  const httpClient = new HttpClient(apiBasePath);
  const sessionStorageSvc = new SessionStorageService({ key: AUTH_SESSION_STORAGE_TOKEN });
  const gqlClient = new GraphQLClient(httpClient, sessionStorageSvc);

  const authSvc = configureAuthService({ gqlClient, sessionStorageSvc });
  const placesSvc = configurePlacesService({ gqlClient });

  return { 
    notificationSvc,
    httpClient, 
    authSvc, 
    placesSvc 
  };
};

export default configureServices;
