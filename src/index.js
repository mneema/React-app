import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TaskListContainer from './components/tasklist/tasklist.container';
import About from './components/about/about.component';
import TaskFormContainer from './components/taskform/taskForm.container';
import rootReducer from './stores/reducers/index';
import { createStore , applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';


const routeMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, routeMiddleware)
);

console.log('store',store.getState());

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }

    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="tasks" component={TaskListContainer}/>
        <Route path="about" component={About}/>
        <Route path="task/:taskId" component={TaskFormContainer}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
