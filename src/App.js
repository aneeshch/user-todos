import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import UsersPage from './containers/UsersPage.jsx';
import employeeReducer from './reducers/users';
import './App.css';
import 'antd/dist/antd.css';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(employeeReducer, applyMiddleware(...middlewares));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path='/' exact component={UsersPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
