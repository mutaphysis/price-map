import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import {Places} from '../places.js';

import {publishPublicFields, publishPrivateFields} from '../../../../../imports/server/publish';

publishPublicFields('places', Places, []);
