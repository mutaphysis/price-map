const functions = require('firebase-functions');

const map = require('lodash/map');

const admin = require('firebase-admin');
const GeoFire = require('geofire');

admin.initializeApp(functions.config().firebase);
const geofire = new GeoFire(admin.database().ref('/geofire'));

exports.reindexPlaces = functions.https.onRequest((req, res) => {
    var places = admin.database().ref('/places');
    return places.once('value', (snapshot) => {
        var places = snapshot.val();
        var promises = map(places, (place, index) => {
            return geofire.set(index, [place.latitude, place.longitude]).then(() => {console.log(index, " indexed");} ) ;
        });
        return Promise.all(promises);
    }, console.error)
    .then(() => { res.status(200).send("done"); })
    .catch(() => { res.status(500).send("failed"); });
});