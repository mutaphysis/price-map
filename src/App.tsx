import * as React from 'react';
import './App.scss';
import { fire } from './fire';

const logo = require('./logo.svg');
fire.auth();

import { connect, FirebaseProps } from 'react-firebase';

type TestProp = { 
  test?: {name: string},
};

class App extends React.Component<TestProp & FirebaseProps> {
  
  render() {
    console.log('asassa', this.props.firebaseRef());

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Hello {this.props.test && this.props.test.name}
        </p>
      </div>
    );
  }
}

const mapFirebaseToProps = {
  test: 'test'
};

export default connect(mapFirebaseToProps)(App);
