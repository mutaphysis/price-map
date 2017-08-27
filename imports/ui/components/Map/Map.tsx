import {Meteor} from 'meteor/meteor';
import {Component} from 'react';
import styled from 'styled-components';
import * as React from 'react';
import {MapGL, Marker} from 'react-map-gl';
import * as Dimensions from 'react-dimensions';
import { GeolocatedProps, geolocated } from 'react-geolocated';

import MapIcon from './MapIcon';

interface IMapProps {
  className?: string;
  containerWidth?: number;
  containerHeight?: number;
  initialLatitude?: number;
  initialLongitude?: number;
}

interface IMaptState {
  viewport: {
    zoom: number;
    bearing: number;
    pitch: number;
    latitude: number;
    longitude: number;
  };
  settings: {
    dragPan: boolean,
    dragRotate: boolean,
    scrollZoom: boolean,
    touchZoomRotate: boolean,
    doubleClickZoom: boolean,
    minZoom: number,
    maxZoom: number,
    minPitch: number,
    maxPitch: number,
  };
}

class Map extends Component<IMapProps & GeolocatedProps, IMaptState> {
  public state = {
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
  };

  public render(): JSX.Element {
    this.setCoords();
    return (
      <div className={this.props.className || ''} data-component="Map">                
        latitude: {this.props.coords && this.props.coords.latitude}
        longitude: {this.props.coords && this.props.coords.longitude}
        <MapGL
          {...this.state.viewport}
          {...this.state.settings}
          width={this.props.containerWidth || window.innerWidth}
          height={this.props.containerHeight || window.innerHeight}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={Meteor.settings.public.mapbox}
          onViewportChange={this.updateViewport} >
          {this.renderPositionMarker()}
          {this.renderMarker(52.47393, 13.36595, 'test')}
        </MapGL>
      </div>
    );
  }

  private renderPositionMarker = () : JSX.Element => {
    // if (this.props.coords) {
      return ( this.renderMarker(this.state.viewport.latitude, this.state.viewport.longitude, 'currentPosition') );
    // }
    // return null;
  }

  private renderMarker = (latitude: number, longitude: number, key: string) : JSX.Element => {
    return (
      <Marker
        key={key}
        latitude={latitude}
        longitude={longitude} >
        <MapIcon size={24} />
      </Marker>
    );
  }

  private updateViewport = (viewport) => {
    this.setState({viewport});
  }

  private setCoords = () => {
    if (this.props.coords) {
      this.state.viewport.latitude = this.props.coords.latitude;
      this.state.viewport.longitude = this.props.coords.longitude;
    } else {
      this.state.viewport.latitude = this.props.initialLatitude || this.state.viewport.latitude;
      this.state.viewport.longitude = this.props.initialLongitude || this.state.viewport.longitude;
    }
  }
};

const GeoLocatedMap = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 2500,
  },
  userDecisionTimeout: 10000,
})(Map);

const ScalingMap = Dimensions({
  containerStyle: {flex: '1 1 auto', display: 'flex' },
})(GeoLocatedMap);

export default ScalingMap;
