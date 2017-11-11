import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export function publishAndLog(name, publishFunction) {
  console.log('Publishing', name, '…');
  Meteor.publish(name, publishFunction);
}

// Publishes all public fields for a collection. You can optionally supply function to specify
// which documents' public fields should be published as third parameter. This function is called
// with a userId argument and should return a selector.
// The publication ensures only documents that are visible for the given user are published. To
// specify what's visible, implement `visibleSelectorForUserId` in your collection.

export function publishPublicFields(
  publicationName: string,
  collection: Mongo.Collection<any>,
  publicFields: string[],
  selectorFunction: (arg: string) => object = null,
  options: object = {},
  visibleSelector: object = null,
) {
  check(publicationName, String);
  check(collection, Mongo.Collection);
  const givenSelector = selectorFunction ? selectorFunction(this.userId) : {};
  check(givenSelector, Match.ObjectIncluding({}));

  publishAndLog(
    `${publicationName}.public`,
    function publish() {
      this.autorun(() => {
        const selector = { $and: ([givenSelector, visibleSelector].filter(Boolean)) };
        return collection.find(
          selector,
          Object.assign({}, options, { fields: publicFields }),
        );
      });
    },
  );
}

// Like publishPublicFields, but publishes only private fields.

export function publishPrivateFields(
  publicationName: string,
  collection: Mongo.Collection<any>,
  privateFields: string[],
  selectorFunction: (arg: string) => object = null,
  options: object = {},
  visibleSelector: object = null,
) {
  check(publicationName, String);
  check(collection, Mongo.Collection);
  check(selectorFunction, Function);
  const givenSelector = selectorFunction ? selectorFunction(this.userId) : {};
  check(givenSelector, Match.ObjectIncluding({}));
  publishAndLog(
    `${publicationName}.private`,
    function publish() {
      this.autorun(() => {
        const selector = { $and: [givenSelector, visibleSelector].filter(Boolean) };
        return collection.find(
          selector,
          Object.assign({}, options, { fields: privateFields }),
        );
      });
    },
  );
}