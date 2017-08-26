import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Places = new Mongo.Collection('Places');

  // tslint:disable:object-literal-sort-keys
Places.schema = new SimpleSchema({
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
    regEx: SimpleSchema.RegEx.Url,
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

Places.helpers({});

Places.attachSchema(Places.schema);
