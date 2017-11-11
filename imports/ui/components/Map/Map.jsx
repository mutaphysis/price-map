"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var react_1 = require("react");
var React = require("react");
var react_map_gl_1 = require("react-map-gl");
var Dimensions = require("react-dimensions");
var react_geolocated_1 = require("react-geolocated");
var MapIcon_1 = require("./MapIcon");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            viewport: {
                zoom: 11,
                bearing: 0,
                pitch: 0,
                latitude: 52.47393,
                longitude: 13.36595,
            },
            settings: {
                dragPan: true,
                dragRotate: true,
                scrollZoom: true,
                touchZoomRotate: true,
                doubleClickZoom: true,
                minZoom: 0,
                maxZoom: 20,
                minPitch: 0,
                maxPitch: 85,
            },
            waitingForPosition: true,
            positionLocked: false,
        };
        _this.renderPositionMarker = function () {
            if (_this.props.coords) {
                return (_this.renderMarker(_this.props.coords.latitude, _this.props.coords.longitude, 'currentPosition'));
            }
            return null;
        };
        _this.renderMarker = function (latitude, longitude, key) {
            return (<react_map_gl_1.Marker key={key} latitude={latitude} longitude={longitude} offsetLeft={-16} offsetTop={-24}>
        <MapIcon_1.default path="/icons/position.svg" size={32}/>
      </react_map_gl_1.Marker>);
        };
        _this.updateViewport = function (viewport) {
            _this.setState({ viewport: viewport });
        };
        _this.setCoords = function () {
            if (_this.props.coords && _this.state.positionLocked) {
                _this.state.viewport.latitude = _this.props.coords.latitude;
                _this.state.viewport.longitude = _this.props.coords.longitude;
            }
        };
        return _this;
    }
    Map.prototype.render = function () {
        this.state.waitingForPosition = this.props.coords == null;
        this.setCoords();
        return (<div className={this.props.className || ''} data-component="Map">                
        latitude: {this.props.coords && this.props.coords.latitude}
        longitude: {this.props.coords && this.props.coords.longitude}
        <react_map_gl_1.default {...this.state.viewport} {...this.state.settings} width={this.props.containerWidth || 100} height={this.props.containerHeight || 100} mapStyle="mapbox://styles/mapbox/dark-v9" mapboxApiAccessToken={meteor_1.Meteor.settings.public.mapbox} onViewportChange={this.updateViewport}>
          {this.renderPositionMarker()}
          <react_map_gl_1.NavigationControl onChangeViewport={this.updateViewport}/>
        </react_map_gl_1.default>
      </div>);
    };
    return Map;
}(react_1.Component));
;
var GeoLocatedMap = react_geolocated_1.geolocated()(Map);
var ScalingMap = Dimensions({
    containerStyle: { flex: '1 1 auto', display: 'flex' },
})(GeoLocatedMap);
exports.default = ScalingMap;
