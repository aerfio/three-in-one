import { Services } from "./types";
import { extractActions, extractReducers } from './extract';

import configureAuthModule from './Auth';
import configureDiscoverModule from './Discover';

const configureModules = async (services: Services) => {
  // @ts-ignore
  const authModule = configureAuthModule(services);
  // @ts-ignore
  const discoverModule = configureDiscoverModule(services);

  const modules = {
    auth: authModule,
    discover: discoverModule,
  };

  return {
    actions: extractActions(modules),
    reducers: extractReducers(modules),
  };
};

export default configureModules;