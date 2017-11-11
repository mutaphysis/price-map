"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var reactrouter_react_router_ssr_1 = require("meteor/reactrouter:react-router-ssr");
var routes_1 = require("../imports/ui/routes");
require("./main.scss");
meteor_1.Meteor.startup(function () {
    reactrouter_react_router_ssr_1.ReactRouterSSR.Run(routes_1.default);
});
