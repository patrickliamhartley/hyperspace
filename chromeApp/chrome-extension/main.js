import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserSignIn from './views/userSignIn.js';
import HyperspaceWorker from './views/hyperSpaceWorker.js';


class ChromeApp extends Component {
  constructor (props) {
    super(props);
  
    this.state = {
      authenticated: false, 
      username: ''
    };

    this.authenticateUser = this.authenticateUser.bind(this);
  }

  componentWillMount() {
    var context = this;

    // check if username is already stored in local storage
    chrome.storage.sync.get(['username'], function (storageObj) {
      if ( storageObj.username ) {
        var username = storageObj.username;
        context.setState({
          authenticated: true,
          username: username
        });
      }
    });
  }

  saveToLocalStorage() {
    var username = this.state.username;
    var context = this;

    chrome.storage.sync.set({'username': context.state.username}, function () {
      chrome.storage.sync.get(['username'], function(storageObj) {
        console.log('confirming that username is now in localStorage:', storageObj.username);
      });
    });
  }
  
  authenticateUser(e) {
    e.preventDefault();
    var context = this;

    var request = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var authenticated = false;
    
    // second, true argument below means send async
    request.open('POST', 'http://127.0.0.1:3000/login', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(encodeURI('username=' + username + '&password=' + password));
    console.log('username and pass are', username + password);
   
    request.onreadystatechange = function () {
      console.log('status here is', this.status);
      console.log('we received a change in status!');
      if (this.status === 200 ) {
        context.setState({
          authenticated: true,
          username: username
        });
        console.log('authenticated val is now', context.state.authenticated);
        context.saveToLocalStorage();
      } else {
        console.log ('authenticated val is now', context.state.authenticated);
      }
    };
  }

  render () {
    return (
      <div>
        {this.state.authenticated ? <HyperspaceWorker props={this.props} username={this.state.username}/> : <UserSignIn props={this.props} authenticateUser={this.authenticateUser.bind(this)}/>}
      </div>
    );
  }
}

ReactDOM.render(<ChromeApp />, document.getElementById('content'));


