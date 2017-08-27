import * as React from 'react';
import styled from 'styled-components';
import Map from '../../components/Map/Map';

const Home = (props) => (
  <div className={`${props.className}`}>
    <h1>Home!</h1>
    <Map/>
  </div>
);

export default styled(Home)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;
