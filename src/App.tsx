import { map } from 'lodash';
import * as React from 'react';
import { FirebaseAuth, SignInFlows } from 'react-firebaseui';
import * as firebase from 'firebase';

import { Price } from './schema';
import './App.scss';
import './fire';
import './schema';

const logo = require('./logo.svg');

import { connect, FirebaseProps } from 'react-firebase';

type FireBasePropState = 'loading' | 'not-found' | 'data-available';

function firebasePropState(obj: {}, key: string): FireBasePropState {
  if (!obj.hasOwnProperty(key)) {
    return 'loading';
  }
  if (obj[key] === null) {
    return 'not-found';
  }
  return 'data-available';
}

type PriceFireBaseProp = { 
  prices?: {[key: string]: Price} | null,
};

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// firebase.database.enableLogging(false, true);

class App extends React.Component<PriceFireBaseProp & FirebaseProps> {
  state: {signedIn: boolean} = {signedIn: false};

  // Configure FirebaseUI.
  uiConfig = {
    signInFlow: 'popup' as SignInFlows,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {
        this.setState({signedIn: true});
        return false;
      }
    }
  };

  render() {
    console.log('rerendered', firebasePropState(this.props, 'prices'));

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </div>
        <div>
          Hello 
          {this.props.prices && 
           map(this.props.prices, (price, id) => { return (<b key={id}>{id}</b>); } ) }
          <button onClick={this.pushPrice}>Click me to save!</button>
        </div>
        <div>
        {auth.currentUser ? 
          <button onClick={() => {auth.signOut().then(() => this.setState({signedIn: false})); }}>Logout</button> : 
          <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth}/>
        }
        </div>
      </div>
    );
  }

  pushPrice = () => {
    if  (!auth.currentUser) {
      return;
    }

    const fbRoot = this.props.firebaseRef();
    const prices = fbRoot.child('prices');
    const uid = auth.currentUser.uid;
    prices.push().set({
      price:  {value: 1.50, unit: 'EUR' }, 
      collectedAt: firebase.database.ServerValue.TIMESTAMP,
      creator: uid,
      product: '-Prod-yVciW2D-QjLSn_I8po',
      place: 'spaeti-00598b4d',
    });
  }
}

const mapFirebaseToProps = {
  prices:  'prices'
};

export default connect(mapFirebaseToProps)(App);
