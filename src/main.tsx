import React from 'react'
import ReactDOM from 'react-dom/client'
import {persistor, store} from "@/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {App} from "@/App.tsx";
import {BrowserRouter} from "react-router-dom";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((err) => {
            console.error("Service Worker registration failed:", err);
        });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)
