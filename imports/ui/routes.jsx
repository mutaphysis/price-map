"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var App_1 = require("./App");
var Show_1 = require("./pages/Places/Show");
var Home_1 = require("./pages/Home/Home");
var NotFound_1 = require("./pages/NotFound/NotFound");
var AppRouter = (<react_router_1.Router>
    <react_router_1.Route path="/" component={App_1.default}>
      <react_router_1.IndexRoute component={Home_1.default}/>
      <react_router_1.Route path="/places/:_id" component={Show_1.default}/>
      <react_router_1.Route path="*" component={NotFound_1.default}/>
    </react_router_1.Route>
  </react_router_1.Router>);
exports.default = AppRouter;
