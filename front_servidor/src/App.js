import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-select-plus/dist/react-select-plus.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "./config/ReactotronConfig";
import Routes from "./routes";
import history from "./services/history";
import { store, persistor } from "./store";
const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
