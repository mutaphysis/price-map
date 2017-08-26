import {Meteor} from 'meteor/meteor';
import {Component} from 'react';
import styled from 'styled-components';
import * as React from 'react';
import ReactMapGL from 'react-map-gl';
import * as Dimensions from 'react-dimensions';

interface IMapProps {
  className?: string;
  containerWidth?: number;
  containerHeight?: number;
}

interface IMaptState {
  viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
    bearing: number;
    pitch: number;
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

class Map extends Component<IMapProps, IMaptState> {
  public state = {
    viewport: {
      latitude: 37.7751,
      longitude: -122.4193,
      zoom: 11,
      bearing: 0,
      pitch: 0,
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

  public render() {
    return (
      <div className={this.props.className || ''} data-component="Map">
        <ReactMapGL
          {...this.state.viewport}
          {...this.state.settings}
          width={this.props.containerWidth || window.innerWidth}
          height={this.props.containerHeight || window.innerHeight}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          latitude={37.7577}
          longitude={-122.4376}
          mapboxApiAccessToken={Meteor.settings.public.mapbox}
          zoom={8}
          />
      </div>
    );
  }
};

export default Dimensions({ containerStyle: {flex: '1 1 auto', display: 'flex' }})(Map);
