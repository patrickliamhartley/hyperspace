import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Test from './components/test';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Layout from './components/layoutTest';
import Dashboard from './components/dashboard';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Category from './components/category';
import Side from './components/side';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Bored from './components/bored';
import store from '../store';
import SpaceLogin from './components/SpaceLogin';

class App extends Component {
  constructor (props) {
    super(props);

// check if auth exists

    fetch('', {
      credentials: 'same-origin'
    }).then(function (res) {
      res.text().then(function (response) {
        if (response === 'No Auth') {
          store.dispatch({type: 'USERNAME_UPDATE', payload: ''});
        } else {
          store.dispatch({type: 'USERNAME_UPDATE', payload: response});
        }
      });
    });

// check if auth exists


    store.dispatch({type: 'AUTH_SUCCESS', payload: null});
    store.dispatch({type: 'GET_CATEGORIES', payload: []});
    store.dispatch({type: 'CAT_TITLE', payload: 'home'});
    store.dispatch({type: 'GET_DATA', payload: []});
    store.dispatch({type: 'OPEN', payload: null});
    store.dispatch({type: 'S_HYPERS', payload: []});
    store.dispatch({type: 'SELF', payload: null});
    store.dispatch({type: 'TOGGLE_SWITCH', payload: null});
    injectTapEventPlugin();
  }
   // onEnter={requireAuth}

  render() {
    return (
      <MuiThemeProvider>
      <Router history={browserHistory} >
        <Route path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/spacelogin' component={SpaceLogin} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/layout' component= {Layout} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/:user/:category' component={Category} />
        <Route path='/test' component={Test} />
        <Route path='/:user/:category/bored' component={Bored}/>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);