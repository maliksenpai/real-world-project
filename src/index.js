import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ReactValidatableFormProvider } from "react-validatable-form";
import { applyMiddleware, createStore } from "redux";
import { MainRedux } from "./redux/reducer/MainRedux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { logger } from "redux-logger/src";

const cache = createCache({
  key: "css",
  prepend: true,
});

let store;

console.log(process.env.REACT_APP_EXAMPLE_VALUE);

if(process.env.NODE_ENV !== 'production'){
  store = createStore(MainRedux, applyMiddleware(thunk, logger));
}else{
  store = createStore(MainRedux, applyMiddleware(thunk));
}


ReactDOM.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ReactValidatableFormProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ReactValidatableFormProvider>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
