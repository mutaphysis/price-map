"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var places_1 = require("../../../both/api/places/places");
;
var Show = function (props) {
    var _id = props.params._id;
    return (<div className={"" + props.className}>
      <h1>{props.place ? props.place.name : 'missing'}</h1>
    </div>);
};
var ShowContainer = react_meteor_data_1.createContainer(function (props) {
    var handle = Meteor.subscribe('Places');
    return {
        currentUser: Meteor.user(),
        isLoading: !handle.ready(),
        place: places_1.Places.findOne(props.params._id),
    };
}, Show);
exports.default = (_a = ["\n"], _a.raw = ["\n"], styled_components_1.default(ShowContainer)(_a));
var _a;
