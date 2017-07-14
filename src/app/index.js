import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'

import reducers from './reducers'

import './containers/bundle.scss'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware())(createStore)
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'))
