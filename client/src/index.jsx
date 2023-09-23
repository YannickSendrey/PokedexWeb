import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import { DetailedPokemon } from './components/DetailedPokemon.jsx';
import { Header } from './components/Header.jsx';
import { Home } from './features/Home/Home.jsx';
import { Provider } from 'react-redux';
import store from './app/store.jsx';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider as Router,
	Route,
} from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Header />}>
			<Route
				index
				element={<Home />}
			/>
			<Route
				path='/pokemons'
				element={<App />}
			/>
			<Route
				path='/pokemons/:id'
				element={<DetailedPokemon />}
			/>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Router router={router}></Router>
	</Provider>
);
