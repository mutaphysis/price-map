import * as React from 'react';
import { FirebaseAuth, SignInFlows } from 'react-firebaseui';
import * as firebase from 'firebase';
import './fire';

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

class Auth extends React.Component {  
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
    if (auth.currentUser) {
        return (
          <button onClick={() => { auth.signOut().then(() => this.setState({signedIn: false})); }}>
            Logout
          </button>);
    }

    return (   
      <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth}/>
    );
  }
}

export default Auth;
