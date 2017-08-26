import * as React from 'react';
import styled from 'styled-components';
import {createContainer} from 'meteor/react-meteor-data';
import {Places} from '../../../both/api/places/places';

interface IShowPlaceProps {
  params: {
    _id: number;
  };
  place: {
    name: string;
  };
  className?: string;
};

const Show = (props: IShowPlaceProps) => {
  const _id = props.params._id;
  return (
    <div className={`${props.className}`}>
      <h1>{props.place ? props.place.name : 'missing'}</h1>
    </div>
  );
};

const ShowContainer = createContainer((props: IShowPlaceProps) => {
  const handle = Meteor.subscribe('Places');

  return {
    currentUser: Meteor.user(),
    isLoading: !handle.ready(),
    place: Places.findOne(props.params._id),
  };
}, Show);

export default styled(ShowContainer)`
    color:#444;
`;
