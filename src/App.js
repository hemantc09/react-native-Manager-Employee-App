import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
// import LoginForm from './components/LoginForm';
import Router from './Router';


class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAELZjuaucf6bjKXBUuiT8K_zDZ4qWM9gE',
      authDomain: 'manager-da8ce.firebaseapp.com',
      databaseURL: 'https://manager-da8ce.firebaseio.com',
      projectId: 'manager-da8ce',
      storageBucket: 'manager-da8ce.appspot.com',
      messagingSenderId: '415645728185'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
