import React from 'react';
import { Provider } from 'react-redux';
import { Store } from "redux";

import { ToastContainer } from 'react-toastify';

import Router from "../Router";
import Header from "../Header";
import Footer  from "../Footer";

interface Props {
  store: Store,
}

const Root: React.FunctionComponent<Props> = ({
  store,
}) => {
  return (
    <Provider store={store}>
      <Header />
      <Router />
      <Footer />
      <ToastContainer />
    </Provider>
  );
};

export default Root;