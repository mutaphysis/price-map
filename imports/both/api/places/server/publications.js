"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var places_js_1 = require("../places.js");
var publish_1 = require("../../../../../imports/server/publish");
publish_1.publishPublicFields('places', places_js_1.Places, []);
