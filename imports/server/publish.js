"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var mongo_1 = require("meteor/mongo");
var check_1 = require("meteor/check");
function publishAndLog(name, publishFunction) {
    console.log('Publishing', name, '…');
    meteor_1.Meteor.publish(name, publishFunction);
}
exports.publishAndLog = publishAndLog;
// Publishes all public fields for a collection. You can optionally supply function to specify
// which documents' public fields should be published as third parameter. This function is called
// with a userId argument and should return a selector.
// The publication ensures only documents that are visible for the given user are published. To
// specify what's visible, implement `visibleSelectorForUserId` in your collection.
function publishPublicFields(publicationName, collection, publicFields, selectorFunction, options, visibleSelector) {
    if (selectorFunction === void 0) { selectorFunction = null; }
    if (options === void 0) { options = {}; }
    if (visibleSelector === void 0) { visibleSelector = null; }
    check_1.check(publicationName, String);
    check_1.check(collection, mongo_1.Mongo.Collection);
    var givenSelector = selectorFunction ? selectorFunction(this.userId) : {};
    check_1.check(givenSelector, check_1.Match.ObjectIncluding({}));
    publishAndLog(publicationName + ".public", function publish() {
        this.autorun(function () {
            var selector = { $and: ([givenSelector, visibleSelector].filter(Boolean)) };
            return collection.find(selector, Object.assign({}, options, { fields: publicFields }));
        });
    });
}
exports.publishPublicFields = publishPublicFields;
// Like publishPublicFields, but publishes only private fields.
function publishPrivateFields(publicationName, collection, privateFields, selectorFunction, options, visibleSelector) {
    if (selectorFunction === void 0) { selectorFunction = null; }
    if (options === void 0) { options = {}; }
    if (visibleSelector === void 0) { visibleSelector = null; }
    check_1.check(publicationName, String);
    check_1.check(collection, mongo_1.Mongo.Collection);
    check_1.check(selectorFunction, Function);
    var givenSelector = selectorFunction ? selectorFunction(this.userId) : {};
    check_1.check(givenSelector, check_1.Match.ObjectIncluding({}));
    publishAndLog(publicationName + ".private", function publish() {
        this.autorun(function () {
            var selector = { $and: [givenSelector, visibleSelector].filter(Boolean) };
            return collection.find(selector, Object.assign({}, options, { fields: privateFields }));
        });
    });
}
exports.publishPrivateFields = publishPrivateFields;
