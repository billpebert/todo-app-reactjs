import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "tw-elements"

import { store } from "./app/store";
import { Provider } from "react-redux";
import { extendedApiSliceActivity } from "./slice/ActivitySlice";

store.dispatch(extendedApiSliceActivity.endpoints.getActivities.initiate())
// store.dispatch(extendedApiSliceActivity.endpoints.getActivity.initiate())

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
		</Provider>
	// </React.StrictMode>
);
