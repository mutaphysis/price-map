import Auth from './Auth';
import * as firebase from 'firebase';
import * as React from 'react';
import Home from './Home';
import { connect, FirebaseProps } from 'react-firebase';
import { map } from 'lodash';
import { NavigationDrawer } from 'react-md';
import { Price } from './schema';
import { Route, Switch } from 'react-router';
import NaviLink from './components/NaviLink';

import './schema';
import './fire';
import './App.scss';

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

type NavEntry = {exact: boolean, label: string, to: string, icon?: string};
const navigationItems: Array<NavEntry> = [{
  exact: true,
  label: 'Home',
  to: '/',
}, {
  exact: true,
  label: 'Auth',
  to: '/auth',
}];

const createNavigation = (items: Array<NavEntry>) => { 
  return items.map((n, i) => <NaviLink key={i} label={n.label} to={n.to} exact={n.exact} />); 
};

class App extends React.Component<PriceFireBaseProp & FirebaseProps> {

  render() {
    console.log('rerendered', firebasePropState(this.props, 'prices'));

    return (   
      <NavigationDrawer 
        drawerTitle="Price-Map" 
        toolbarTitle="Mappit!"
        navItems={createNavigation(navigationItems)}
      >
        <div className="sub-header">
          <h2>This is gonna be awesome</h2>
        </div>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/auth" component={Auth}/>
        </Switch>
        <div>
          Hello 
          {this.props.prices && 
          map(this.props.prices, (price, id) => { return (<b key={id}>{id}</b>); } ) }
          <button onClick={this.pushPrice}>Click me to save!</button>
        </div>
      </NavigationDrawer>
    );
  }

  pushPrice = () => {
    const auth = firebase.auth();
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
