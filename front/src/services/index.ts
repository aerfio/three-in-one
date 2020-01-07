import { Service } from "./types";

import { NotificationService } from "./Notification";
import { HttpClient } from "./HttpClient";

import { configureAuthService } from "./Auth";
import { configurePlacesService } from "./Places";

const configureServices = async ({
  apiBasePath,
}: {
  apiBasePath: string
}): Promise<{ [key: string]: Service }> => {
  const notificationSvc = new NotificationService();
  const httpClient = new HttpClient(apiBasePath);
  const authSvc = configureAuthService({ httpClient });
  const placesSvc = configurePlacesService({ httpClient, authSvc });

  return { 
    notificationSvc,
    httpClient, 
    authSvc, 
    placesSvc 
  };
};

export default configureServices;
