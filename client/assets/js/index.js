import React  from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux';
import { CookiesProvider } from 'react-cookie';


import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './components/App';





let store = createStore(reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunk)
)



render(
		    <Provider store={store}>
					<CookiesProvider>
						<App />
					</CookiesProvider>
				</Provider>,
	    document.getElementById('root')
)
