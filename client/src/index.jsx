import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import { Provider } from 'react-redux';
import store from './app/store.jsx';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider as Router,
    Route
  } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'element={ <App/> }/>
));

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router router={router}>
        </Router>
     </Provider>
  )
  