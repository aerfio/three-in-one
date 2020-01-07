import React from "react";
import ReactDOM from "react-dom";

import configureServices from "./services"
import configureModules from "./modules"
import configureStore from "./store";
import context from './context';

import "./index.css"
import 'react-toastify/dist/ReactToastify.css';

const render = async (store: ReturnType<typeof configureStore>) => {
  const Root = (await import('./components/Root')).default
  const target = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, target);
};

async function init() {
  const services = await configureServices({
    apiBasePath: "",
  });
  const { actions, reducers } = await configureModules(services); 

  context.registerServices(services);
  context.registerActions(actions);

  render(configureStore(reducers));
}
init()