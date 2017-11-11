"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = require("meteor/mongo");
var simpl_schema_1 = require("simpl-schema");
exports.Places = new mongo_1.Mongo.Collection('Places');
// tslint:disable:object-literal-sort-keys
exports.Places.schema = new simpl_schema_1.default({
    name: {
        label: 'Name of the place',
        type: String,
        max: 1000,
    },
    coordinates: {
        type: Object,
        optional: false,
    },
    address: {
        label: 'Address',
        type: String,
        max: 1000,
        optional: true,
    },
    addressAdditional: {
        label: 'Address (Additional)',
        type: String,
        max: 1000,
        optional: true,
    },
    zipCode: {
        label: 'ZIP-Code',
        type: String,
        max: 1000,
        optional: true,
    },
    city: {
        label: 'City',
        type: String,
        optional: true,
        max: 100,
    },
    country: {
        label: 'Country',
        type: String,
        optional: true,
        max: 100,
    },
    phoneNumber: {
        label: 'Phone number',
        type: String,
        max: 100,
        optional: true,
    },
    webSite: {
        label: 'Web-Site',
        type: String,
        regEx: simpl_schema_1.default.RegEx.Url,
        max: 1000,
        optional: true,
    },
    description: {
        label: 'Short description (optional)',
        type: String,
        max: 2000,
        optional: true,
    },
});
exports.Places.helpers({});
exports.Places.attachSchema(exports.Places.schema);
