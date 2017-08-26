import * as React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import {Router, Route, IndexRoute} from 'react-router';

import App from './App';
import ShowPlace from './pages/Places/Show';
import Home from './pages/Home';
import NotFound from './pages/NotFound/NotFound';

export default(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/places/:_id" component={ShowPlace}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
